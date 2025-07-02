import { NextRequest, NextResponse } from 'next/server';
import { restaurants } from '@/lib/data';

function isTopRatedQuery(query: string) {
  const lowered = query.toLowerCase();
  return (
    lowered.includes('top rated') ||
    lowered.includes('best restaurants') ||
    lowered.includes('top restaurants') ||
    lowered.includes('highest rated') ||
    lowered.includes('popular restaurants')
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || body.craving;
    const conversationHistory = body.conversationHistory || [];

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid query' }, { status: 400 });
    }

    // Handle top rated/best restaurant queries directly
    if (isTopRatedQuery(query)) {
      const topRestaurants = [...restaurants]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
        .map(r => `${r.name} (${r.cuisine.join(', ')}) - ${r.rating.toFixed(1)}★`);
      return NextResponse.json({
        suggestions: [
          'Here are the top rated restaurants on Hunger:',
          ...topRestaurants
        ]
      });
    }

    // Use OpenAI's API (assume env var OPENAI_API_KEY is set)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    // Get all restaurants and menu items for context
    const restaurantContext = restaurants.map(restaurant => ({
      name: restaurant.name,
      cuisine: restaurant.cuisine.join(', '),
      rating: restaurant.rating,
      description: restaurant.description,
      popularItems: restaurant.menu.slice(0, 3).map(item => ({
        name: item.name,
        description: item.description,
        price: item.price
      }))
    }));

    const contextString = restaurantContext.map(restaurant => 
      `${restaurant.name} (${restaurant.cuisine}, ${restaurant.rating}★): ${restaurant.description}
Popular dishes: ${restaurant.popularItems.map(item => `${item.name} ($${item.price}) - ${item.description}`).join('; ')}`
    ).join('\n\n');

    // Enhanced system prompt with chain of thought reasoning
    const systemPrompt = `You are a knowledgeable food concierge for Hunger, a premium food delivery service. Your job is to provide thoughtful, personalized restaurant and dish recommendations.

REASONING APPROACH:
1. First, understand what the user is asking for (cuisine type, dietary needs, mood, etc.)
2. Consider our conversation history to understand their preferences
3. Think through which restaurants and dishes would best match their needs
4. Explain your reasoning clearly and provide specific recommendations

AVAILABLE RESTAURANTS:
${contextString}

RESPONSE STYLE:
- Be conversational and friendly, like a knowledgeable food expert
- Show your thinking process: "Based on what you're looking for..."
- Give specific dish recommendations with brief explanations
- Consider dietary restrictions, preferences, and context from our conversation
- If appropriate, suggest complementary items or alternatives
- Keep responses focused but informative

EXAMPLE REASONING:
"Since you mentioned you're in the mood for something spicy, I'm thinking of our Indian options. Saffron Spice would be perfect - their Butter Chicken has that rich, creamy heat you might enjoy, and if you want something lighter, their Tandoori Chicken is excellently spiced without being too heavy."

Always explain WHY you're recommending something based on the user's needs and preferences.`;

    // Build messages array with conversation history
    const messages = [
      {
        role: 'system',
        content: systemPrompt,
      },
      // Include conversation history for context
      ...conversationHistory.slice(-8), // Keep last 8 messages for context
    ];

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!openaiRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch from OpenAI' }, { status: 500 });
    }

    const openaiData = await openaiRes.json();
    const content = openaiData.choices?.[0]?.message?.content || '';

    // Return the full response as an array of lines for the chat widget
    const suggestions = content.split('\n').filter((line: string) => line.trim().length > 0);

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error('Recommendation API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

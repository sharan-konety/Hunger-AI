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
    console.log('API endpoint hit');
    const body = await req.json();
    console.log('Request body:', body);
    
    const query = body.query || body.craving;
    const conversationHistory = body.conversationHistory || [];

    if (!query || typeof query !== 'string') {
      console.log('Invalid query:', query);
      return NextResponse.json({ error: 'Missing or invalid query' }, { status: 400 });
    }

    console.log('Processing query:', query);

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

    // Get all menu items from all restaurants for context
    const allMenuItems = restaurants.flatMap(restaurant => 
      restaurant.menu.map(item => ({
        name: item.name,
        description: item.description,
        price: item.price,
        restaurant: restaurant.name,
        cuisine: restaurant.cuisine.join(', '),
        rating: restaurant.rating
      }))
    );

    // Limit menu context to prevent token overflow
    const limitedMenuItems = allMenuItems.slice(0, 30); // Reduce from all items to 30
    const menuContext = limitedMenuItems.map(item => 
      `${item.name} from ${item.restaurant} (${item.cuisine}) - $${item.price.toFixed(2)}`
    ).join('\n');

    // Use OpenAI's API (assume env var OPENAI_API_KEY is set)
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('API key exists:', !!apiKey);
    
    if (!apiKey) {
      console.warn('OpenAI API key not configured, using fallback recommendations');
      // Fallback to manual recommendations when API key is missing
      const loweredQuery = query.toLowerCase();
      console.log('Using fallback for query:', loweredQuery);
      
      if (loweredQuery.includes('italian')) {
        const italianItems = allMenuItems.filter(item => 
          item.cuisine.toLowerCase().includes('italian')
        ).slice(0, 5);
        console.log('Found Italian items:', italianItems.length);
        
        if (italianItems.length > 0) {
          const recommendations = italianItems.map(item => 
            `• ${item.name} from ${item.restaurant} - $${item.price.toFixed(2)}\n  ${item.description}`
          );
          
          return NextResponse.json({
            suggestions: [`Here are some delicious Italian options for you:\n\n${recommendations.join('\n\n')}`]
          });
        }
      }
      
      // Enhanced generic fallback with actual restaurant data
      const randomItems = allMenuItems.slice(0, 5);
      const fallbackRecommendations = randomItems.map(item => 
        `• ${item.name} from ${item.restaurant} - $${item.price.toFixed(2)}`
      );
      
      return NextResponse.json({
        suggestions: [`I don't have an OpenAI API key configured, but here are some popular dishes from our restaurants:\n\n${fallbackRecommendations.join('\n')}`]
      });
    }

    // Simplified approach - limit conversation history to prevent confusion
    const recentHistory = conversationHistory.slice(-4); // Only last 2 exchanges
    
    const messages = [
      {
        role: 'system',
        content: `You are a helpful assistant for the Hunger food delivery app. 

IMPORTANT: 
- Only recommend food when the user specifically asks for food recommendations or mentions being hungry/wanting to eat
- You CANNOT place orders or add items to cart - you can only provide recommendations and information

For greetings like "hello", "hi", "hey": Respond with a friendly greeting and ask what they're looking for.

For food requests: 
- Limit initial recommendations to 5 items maximum
- Show DIVERSE options from DIFFERENT restaurants and cuisines (mix Italian, Japanese, Indian)
- Include dish name, restaurant name, and price
- After showing 5 options, ask "Would you like to see more options?"

When users want to order:
- Explain that they need to visit the restaurant page to add items to their cart
- Say something like "To order [dish], you'll need to visit the [restaurant] page and add it to your cart"
- DO NOT offer to place orders or say you will help place orders

Use this menu data: ${menuContext}`,
      },
      // Include limited conversation history
      ...recentHistory,
      // Add the current query WITHOUT the pushy instruction
      {
        role: 'user',
        content: query,
      },
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
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!openaiRes.ok) {
      console.error('OpenAI API error:', openaiRes.status, openaiRes.statusText);
      const errorText = await openaiRes.text();
      console.error('OpenAI error details:', errorText);
      return NextResponse.json({ error: 'Failed to fetch from OpenAI' }, { status: 500 });
    }

    const openaiData = await openaiRes.json();
    console.log('OpenAI response:', openaiData);
    
    const content = openaiData.choices?.[0]?.message?.content || '';
    console.log('Generated content:', content);

    if (!content.trim()) {
      console.error('Empty content from OpenAI');
      return NextResponse.json({ 
        suggestions: ['I apologize, but I encountered an issue generating recommendations. Please try again or browse our restaurants directly!'] 
      });
    }

    // Return the full response as a single message instead of splitting by lines
    const suggestions = [content.trim()];

    return NextResponse.json({ suggestions });
  } catch (err) {
    console.error('Recommendation API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

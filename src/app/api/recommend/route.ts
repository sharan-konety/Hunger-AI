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

    // Get all menu items from all restaurants for context
    const allMenuItems = restaurants.flatMap(restaurant => 
      restaurant.menu.map(item => ({
        name: item.name,
        description: item.description,
        restaurant: restaurant.name,
        cuisine: restaurant.cuisine.join(', ')
      }))
    );

    const menuContext = allMenuItems.slice(0, 50).map(item => 
      `${item.name} from ${item.restaurant} (${item.cuisine}) - ${item.description}`
    ).join('\n');

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful food recommendation assistant for the Hunger food delivery app. Based on the user's craving, recommend specific dishes from our partner restaurants. Here are some of our available menu items:\n\n${menuContext}\n\nRespond with a friendly intro and as many recommendations as you think are helpful. Each recommendation should include the dish name and restaurant.`,
          },
          {
            role: 'user',
            content: query,
          },
        ],
        max_tokens: 400,
        temperature: 0.7,
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

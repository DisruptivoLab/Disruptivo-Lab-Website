import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();
    
    if (!urls || !Array.isArray(urls)) {
      return NextResponse.json({ error: 'URLs array required' }, { status: 400 });
    }

    const indexNowKey = '34d8927738643028037a881bbf353c33';
    
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: 'disruptivo.app',
        key: indexNowKey,
        keyLocation: `https://disruptivo.app/${indexNowKey}.txt`,
        urlList: urls,
      }),
    });

    if (!response.ok) {
      throw new Error(`IndexNow API error: ${response.statusText}`);
    }

    return NextResponse.json({ success: true, submitted: urls.length });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}

// app/api/location/route.js
import fetch from 'node-fetch';

export async function GET(req) {
  const ip = req.headers.get('x-forwarded-for') || req.connection.remoteAddress;
  const apiKey = 'b95ac9c7c9a7d6'; // استبدل بـ API Key الخاص بك من ipinfo.io
  const url = `https://ipinfo.io/${ip}/json?token=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to fetch location data' }), { status: 500 });
  }
}

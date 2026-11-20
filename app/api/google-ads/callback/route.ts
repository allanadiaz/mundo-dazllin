import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const redirectUri = "https://mundo-dazllin.vercel.app/api/google-ads/callback";

  if (!code || !clientId || !clientSecret) {
    return NextResponse.redirect("https://mundo-dazllin.vercel.app/google-ads?connected=0");
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenResponse.json();

  if (!tokenResponse.ok || !tokens.refresh_token) {
    return NextResponse.redirect("https://mundo-dazllin.vercel.app/google-ads?connected=0");
  }

  const response = NextResponse.redirect("https://mundo-dazllin.vercel.app/google-ads?connected=1");
  response.cookies.set("google_ads_refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}

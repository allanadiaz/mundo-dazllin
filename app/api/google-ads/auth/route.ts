import { NextResponse } from "next/server";

export function GET(request: Request) {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const redirectUri = "https://mundo-dazllin.vercel.app/api/google-ads/callback";

  if (!clientId) {
    return NextResponse.json(
      { error: "Integração Google Ads ainda não configurada" },
      { status: 503 }
    );
  }

  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  url.searchParams.set("scope", "openid email https://www.googleapis.com/auth/adwords");
  url.searchParams.set("state", crypto.randomUUID());

  return NextResponse.redirect(url.toString());
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("google_ads_refresh_token")?.value;
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;

  if (!refreshToken || !clientId || !clientSecret || !developerToken || !customerId) {
    return NextResponse.json(
      { error: "Google Ads ainda não conectado" },
      { status: 503 }
    );
  }

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
    }),
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || !tokenData.access_token) {
    return NextResponse.json(
      { error: "Não foi possível renovar a autorização do Google Ads" },
      { status: 401 }
    );
  }

  const query = [
    "SELECT",
    "campaign.id, campaign.name, campaign.status,",
    "metrics.cost_micros, metrics.conversions, metrics.impressions, metrics.clicks",
    "FROM campaign",
    "WHERE segments.date DURING TODAY",
  ].join(" ");

  const response = await fetch(
    `https://googleads.googleapis.com/v18/customers/${customerId}/googleAds:searchStream`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "developer-token": developerToken,
        "login-customer-id": customerId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    }
  );

  const body = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: body.error?.message || "Não foi possível consultar o Google Ads" },
      { status: response.status }
    );
  }

  const campaigns = (body.results || body[0]?.results || []).map(
    (item: {
      campaign?: { id?: string; name?: string; status?: string };
      metrics?: {
        costMicros?: string;
        conversions?: number;
        impressions?: string;
        clicks?: string;
      };
    }) => ({
      id: item.campaign?.id,
      name: item.campaign?.name,
      status: item.campaign?.status,
      spend: Number(item.metrics?.costMicros || 0) / 1_000_000,
      conversions: Number(item.metrics?.conversions || 0),
      impressions: Number(item.metrics?.impressions || 0),
      clicks: Number(item.metrics?.clicks || 0),
    })
  );

  return NextResponse.json({ connected: true, campaigns });
}

import { NextResponse } from "next/server";

type MetaAction = {
  action_type?: string;
  value?: string;
};

type MetaInsight = {
  spend?: string;
  impressions?: string;
  reach?: string;
  clicks?: string;
  actions?: MetaAction[];
};

export async function GET() {
  const token = process.env.META_ACCESS_TOKEN;
  const accountId = process.env.META_AD_ACCOUNT_ID;

  if (!token || !accountId) {
    return NextResponse.json(
      { error: "Meta Ads ainda não conectado" },
      { status: 503 }
    );
  }

  const actId = accountId.startsWith("act_") ? accountId : `act_${accountId}`;
  const fields = "spend,impressions,reach,clicks,actions";
  const url = `https://graph.facebook.com/v22.0/${actId}/insights?fields=${fields}&date_preset=maximum&level=account&access_token=${encodeURIComponent(token)}`;

  const response = await fetch(url);
  const body = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: body.error?.message || "Não foi possível consultar o Meta Ads" },
      { status: response.status }
    );
  }

  const insight: MetaInsight = body.data?.[0] || {};
  const conversions = insight.actions
    ?.filter((action) =>
      ["purchase", "lead", "onsite_conversion.lead_grouped", "offsite_conversion.fb_pixel_purchase"].includes(action.action_type || "")
    )
    .reduce((total, action) => total + Number(action.value || 0), 0);

  const spend = Number(insight.spend || 0);
  const conversionCount = conversions || 0;

  return NextResponse.json({
    spend,
    impressions: Number(insight.impressions || 0),
    reach: Number(insight.reach || 0),
    clicks: Number(insight.clicks || 0),
    conversions: conversionCount,
    costPerConversion: conversionCount > 0 ? spend / conversionCount : 0,
  });
}

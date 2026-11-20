"use client";

import { useEffect, useState } from "react";

type GoogleCampaign = {
  id?: string;
  name?: string;
  status?: string;
  spend?: number;
  conversions?: number;
  impressions?: number;
  clicks?: number;
};

export default function GoogleAdsPage() {
  const [connected, setConnected] = useState(false);
  const [campaigns, setCampaigns] = useState<GoogleCampaign[]>([]);

  useEffect(() => {
    fetch("/api/google-ads")
      .then(async (response) => ({ response, body: await response.json() }))
      .then(({ response, body }) => {
        if (response.ok) {
          setConnected(true);
          setCampaigns(body.campaigns || []);
        }
      })
      .catch(() => setConnected(false));
  }, []);

  const formatNumber = (value?: number) =>
    typeof value === "number" ? value.toLocaleString("pt-BR") : "Aguardando conexão";

  const formatCurrency = (value?: number) =>
    typeof value === "number"
      ? value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : "Aguardando conexão";

  const spend = campaigns.reduce((total, campaign) => total + (campaign.spend || 0), 0);
  const conversions = campaigns.reduce((total, campaign) => total + (campaign.conversions || 0), 0);
  const impressions = campaigns.reduce((total, campaign) => total + (campaign.impressions || 0), 0);
  const clicks = campaigns.reduce((total, campaign) => total + (campaign.clicks || 0), 0);

  return (
    <main className="ads-shell">
      <div className="ads-main">
        <header className="ads-header">
          <div className="ads-header-brand">
            <img className="ads-logo" src="/dazllin-logo.png" alt="Dazllin" />
            <div>
              <h1 className="ads-title">Google Ads</h1>
              <p className="ads-subtitle">Acompanhe campanhas, investimento e resultados.</p>
            </div>
          </div>
          <a className="ads-back" href="/">Voltar ao painel</a>
        </header>

        <div className="ads-status"><span className="ads-status-dot" /> {connected ? "Conta conectada" : "Conta ainda não conectada"}</div>

        <section className="ads-grid" style={{ marginTop: 16 }}>
          <article className="ads-card"><div className="ads-card-label">Investimento</div><div className={`ads-card-value ${connected ? "" : "pending"}`}>{connected ? formatCurrency(spend) : "Aguardando conexão"}</div></article>
          <article className="ads-card"><div className="ads-card-label">Conversões</div><div className={`ads-card-value ${connected ? "" : "pending"}`}>{connected ? formatNumber(conversions) : "Aguardando conexão"}</div></article>
          <article className="ads-card"><div className="ads-card-label">Custo por conversão</div><div className={`ads-card-value ${connected ? "" : "pending"}`}>{connected && conversions > 0 ? formatCurrency(spend / conversions) : "Aguardando conexão"}</div></article>
          <article className="ads-card"><div className="ads-card-label">Cliques / impressões</div><div className={`ads-card-value ${connected ? "" : "pending"}`}>{connected ? `${formatNumber(clicks)} / ${formatNumber(impressions)}` : "Aguardando conexão"}</div></article>
        </section>

        <section className="ads-panel">
          <div className="ads-panel-heading">
            <h2>Desempenho das campanhas</h2>
            <span className="ads-account">Cliente: 139-481-0443</span>
          </div>
          <div className="ads-empty">
            <div className="ads-empty-inner">
              <div className="ads-empty-icon">G</div>
              <h3>Conecte sua conta Google Ads</h3>
              <p>Autorize a Dazllin a ler campanhas, custos e conversões da conta selecionada.</p>
              <a className="ads-connect" href="/api/google-ads/auth" target="_blank" rel="noreferrer">Conectar conta Google Ads</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

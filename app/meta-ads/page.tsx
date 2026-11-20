export default function MetaAdsPage() {
  return (
    <main className="ads-shell">
      <div className="ads-main">
        <header className="ads-header">
          <div className="ads-header-brand">
            <img className="ads-logo" src="/dazllin-logo.png" alt="Dazllin" />
            <div>
              <h1 className="ads-title">Meta Ads</h1>
              <p className="ads-subtitle">Acompanhe campanhas, investimento e resultados.</p>
            </div>
          </div>
          <a className="ads-back" href="/">Voltar ao painel</a>
        </header>

        <div className="ads-status"><span className="ads-status-dot" /> Conta ainda não conectada</div>

        <section className="ads-grid" style={{ marginTop: 16 }}>
          <article className="ads-card"><div className="ads-card-label">Investimento</div><div className="ads-card-value pending">Aguardando conexão</div></article>
          <article className="ads-card"><div className="ads-card-label">Conversões</div><div className="ads-card-value pending">Aguardando conexão</div></article>
          <article className="ads-card"><div className="ads-card-label">Custo por resultado</div><div className="ads-card-value pending">Aguardando conexão</div></article>
          <article className="ads-card"><div className="ads-card-label">Retorno sobre investimento</div><div className="ads-card-value pending">Aguardando conexão</div></article>
        </section>

        <section className="ads-panel">
          <div className="ads-panel-heading">
            <h2>Desempenho das campanhas</h2>
            <span className="ads-account">Conta: 1570414770771585</span>
          </div>
          <div className="ads-empty">
            <div className="ads-empty-inner">
              <div className="ads-empty-icon">M</div>
              <h3>Conecte sua conta Meta</h3>
              <p>Autorize a Dazllin a ler campanhas, gastos e resultados da conta selecionada.</p>
              <a className="ads-connect" href="https://business.facebook.com/" target="_blank" rel="noreferrer">Abrir Meta Business</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

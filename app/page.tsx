import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const name = String(user.user_metadata.full_name || user.email || "Usuário").split("@")[0];

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="clinic-brand">
          <img className="clinic-logo" src="/dazllin-logo.png" alt="Dazllin" />
        </div>
        <nav className="nav">
          <div className="nav-section">VISÃO GERAL</div>
          <a className="active" href="/">Visão geral</a>
          <a href="#financeiro">Pacientes</a>
          <a href="#vendas">Agenda</a>
          <div className="nav-section">MARKETING</div>
          <a href="/meta-ads">Meta Ads</a>
          <a href="/google-ads">Google Ads</a>
          <div className="nav-section">GESTÃO</div>
          <a href="#usuarios">Funcionários</a>
          <a href="#financeiro">Relatórios</a>
          <a href="/admin">Configurações</a>
        </nav>
        <div className="sidebar-footer">
          <span>Dazllin</span>
          <small>{name}</small>
        </div>
      </aside>
      <section className="main">
        <header className="topbar">
          <div>
            <div className="breadcrumb">Gestão da clínica</div>
            <h1>Seu cuidado começa na gestão.</h1>
            <p>Uma visão completa dos resultados da sua clínica.</p>
          </div>
          <div className="topbar-actions">
            <button className="period-button">Hoje</button>
            <button className="icon-button" aria-label="Notificações">•••</button>
            <div className="profile-chip">
              <div><strong>{name}</strong><span>Administradora</span></div>
              <div className="avatar">{name.slice(0, 1).toUpperCase()}</div>
            </div>
          </div>
        </header>

        <div className="cards">
          <article className="card highlight-card"><div className="card-title">Receita do mês</div><div className="card-value">R$ 84.250</div><div className="trend">1,9% acima do mês anterior</div></article>
          <article className="card"><div className="card-title">Novos pacientes</div><div className="card-value">48</div><div className="trend">9,8% acima do mês anterior</div></article>
          <article className="card"><div className="card-title">Agendamentos</div><div className="card-value">126</div><div className="trend">10,0% acima do mês anterior</div></article>
          <article className="card"><div className="card-label-inline">Taxa de ocupação</div><div className="card-value">24,8%</div><div className="trend">3,2 pontos acima do mês anterior</div></article>
        </div>

        <div className="grid">
          <article className="card" id="vendas">
            <div className="card-header"><div><div className="card-title">Evolução da receita</div><div className="card-value small">R$ 84.250</div></div><div className="card-period">vs. mês anterior</div></div>
            <div className="line-chart">
              <div className="chart-y"><span>20 mil</span><span>15 mil</span><span>10 mil</span><span>5 mil</span><span>0</span></div>
              <svg viewBox="0 0 700 210" preserveAspectRatio="none" aria-label="Evolução da receita">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7d4f5c" stopOpacity=".18" />
                    <stop offset="100%" stopColor="#7d4f5c" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="42" x2="700" y2="42" className="chart-line" />
                <line x1="0" y1="84" x2="700" y2="84" className="chart-line" />
                <line x1="0" y1="126" x2="700" y2="126" className="chart-line" />
                <line x1="0" y1="168" x2="700" y2="168" className="chart-line" />
                <path d="M0,155 C90,150 150,145 210,138 C290,128 340,120 420,128 C510,138 590,132 700,118 L700,210 L0,210 Z" fill="url(#chartFill)" />
                <path d="M0,155 C90,150 150,145 210,138 C290,128 340,120 420,128 C510,138 590,132 700,118" fill="none" stroke="#6b3948" strokeWidth="3" />
                <circle cx="210" cy="138" r="5" fill="#fff" stroke="#6b3948" strokeWidth="3" />
                <circle cx="420" cy="128" r="5" fill="#fff" stroke="#6b3948" strokeWidth="3" />
                <circle cx="700" cy="118" r="5" fill="#fff" stroke="#6b3948" strokeWidth="3" />
              </svg>
              <div className="chart-x"><span>20/07</span><span>27/07</span><span>03/08</span><span>10/08</span><span>17/08</span></div>
            </div>
          </article>
          <article className="card" id="campanhas">
            <div className="card-header"><div><div className="card-title">Campanhas</div></div><a href="/meta-ads" className="card-link">Ver campanhas</a></div>
            <div className="campaign-list">
              <div className="campaign-row"><div><strong>Meta Ads</strong><span>R$ 2.300 investidos</span></div><div className="campaign-status">Ativa</div><div><b>ROAS</b><strong>5,8×</strong></div></div>
              <div className="campaign-row"><div><strong>Google Ads</strong><span>R$ 2.000 investidos</span></div><div className="campaign-status">Ativa</div><div><b>ROAS</b><strong>6,6×</strong></div></div>
            </div>
          </article>
        </div>

        <div className="bottom-grid">
          <article className="card" id="financeiro">
            <div className="card-header"><div><div className="card-title">Oportunidades no CRM</div><p className="card-subtitle">Cada oportunidade pode virar receita.</p></div><a href="#" className="card-link">Abrir CRM</a></div>
            <table className="table opportunity-table">
              <thead><tr><th>Pacote / serviço</th><th>Origem</th><th>Status</th><th>Valor</th></tr></thead>
              <tbody>
                <tr><td><strong>Botox facial</strong><span>Harmonização</span></td><td>Meta Ads</td><td><span className="status-chip contact">Em contato</span></td><td>R$ 2.900</td></tr>
                <tr><td><strong>Limpeza profunda</strong><span>Estética facial</span></td><td>Instagram</td><td><span className="status-chip scheduled">Agendado</span></td><td>R$ 1.900</td></tr>
              </tbody>
            </table>
          </article>
          <article className="card" id="usuarios">
            <div className="card-header"><div><div className="card-title">Conciliação financeira</div></div><a href="#" className="card-link">Ver detalhes</a></div>
            <div className="conciliation-value"><strong>92%</strong><span>das receitas já conciliadas</span></div>
            <div className="progress-bar"><span style={{ width: "92%" }} /></div>
            <div className="conciliation-list"><div><span>Pagamentos sem revisar</span><b>R$ 2.480</b></div><div><span>Parcelamentos</span><b>R$ 8.420</b></div><div><span>Confirmações pendentes</span><b>R$ 5.920</b></div></div>
          </article>
        </div>
      </section>
    </main>
  );
}

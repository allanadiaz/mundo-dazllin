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
        <div className="brand"><span className="brand-mark">M</span> Mundo Dazllin</div>
        <nav className="nav">
          <a href="/">Resumo</a>
          <a href="#financeiro">Financeiro</a>
          <a href="#vendas">Vendas</a>
          <a href="#usuarios">Usuários</a>
          <a href="#administracao">Administração</a>
        </nav>
      </aside>
      <section className="main">
        <header className="topbar">
          <div><h1>Olá, {name}</h1><p>Acompanhe o desempenho da sua operação.</p></div>
          <div className="avatar">{name.slice(0, 1).toUpperCase()}</div>
        </header>

        <div className="cards">
          <article className="card"><div className="card-title">Receita</div><div className="card-value">R$ 48.920</div><div className="trend">+12,5% neste mês</div></article>
          <article className="card"><div className="card-title">Pedidos</div><div className="card-value">1.284</div><div className="trend">+8,2% neste mês</div></article>
          <article className="card"><div className="card-title">Conversão</div><div className="card-value">5,8%</div><div className="trend">+1,1 ponto percentual</div></article>
        </div>

        <div className="grid">
          <article className="card" id="vendas">
            <div className="card-title">Vendas por mês</div>
            <div className="chart">
              {[38, 52, 45, 66, 58, 75, 64, 82, 70, 91, 84, 100].map((height, index) => (
                <div className="bar" style={{ height: `${height}%` }} key={index} />
              ))}
            </div>
          </article>
          <article className="card" id="financeiro">
            <div className="card-title">Produtos mais vendidos</div>
            <table className="table">
              <thead><tr><th>Produto</th><th>Vendas</th></tr></thead>
              <tbody>
                <tr><td>Produto 1</td><td>342</td></tr>
                <tr><td>Produto 2</td><td>284</td></tr>
                <tr><td>Produto 3</td><td>198</td></tr>
              </tbody>
            </table>
          </article>
        </div>
      </section>
    </main>
  );
}

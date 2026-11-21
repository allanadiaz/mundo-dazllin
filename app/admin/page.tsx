import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();


  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  const users = profiles || [];
  const adminCount = users.filter((item) => item.role === "admin").length;

  return (
    <main className="admin-shell">
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-brand">
            <img className="admin-logo" src="/dazllin-logo.png" alt="Dazllin" />
            <div>
              <h1 className="admin-title">Área administrativa</h1>
              <p className="admin-subtitle">Controle de usuários e configurações da clínica.</p>
            </div>
          </div>
          <a className="admin-back" href="/">Voltar ao painel</a>
        </header>

        <section className="admin-stats">
          <article className="admin-stat"><div className="admin-stat-label">Usuários cadastrados</div><div className="admin-stat-value">{users.length}</div></article>
          <article className="admin-stat"><div className="admin-stat-label">Administradores</div><div className="admin-stat-value">{adminCount}</div></article>
          <article className="admin-stat"><div className="admin-stat-label">Usuários ativos</div><div className="admin-stat-value">{users.length}</div></article>
          <article className="admin-stat"><div className="admin-stat-label">Acesso atual</div><div className="admin-stat-value">Admin</div></article>
        </section>

        <section className="admin-grid">
          <article className="admin-panel">
            <div className="admin-panel-header">
              <h2>Usuários e perfis</h2>
              <input className="admin-search" placeholder="Buscar usuário" aria-label="Buscar usuário" />
            </div>
            <table className="admin-table">
              <thead>
                <tr><th>Usuário</th><th>Perfil</th><th>Cadastro</th></tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="admin-user">
                        <span className="admin-avatar">{String(item.full_name || "U").slice(0, 1).toUpperCase()}</span>
                        <span>{item.full_name || "Usuário"}</span>
                      </div>
                    </td>
                    <td><span className={`admin-role ${item.role === "admin" ? "admin" : ""}`}>{item.role === "admin" ? "Administrador" : "Usuário"}</span></td>
                    <td>{new Date(item.created_at).toLocaleDateString("pt-BR")}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={3}>Nenhum perfil cadastrado.</td></tr>
                )}
              </tbody>
            </table>
          </article>

          <aside className="admin-panel">
            <div className="admin-panel-header"><h2>Configurações</h2></div>
            <div className="admin-settings">
              <div className="admin-setting"><div><strong>Acesso por convite</strong><span>Novos usuários precisam ser cadastrados</span></div><button className="admin-toggle" aria-label="Acesso por convite" /></div>
              <div className="admin-setting"><div><strong>Alertas financeiros</strong><span>Notificações sobre limites e gastos</span></div><button className="admin-toggle" aria-label="Alertas financeiros" /></div>
              <div className="admin-setting"><div><strong>Rotina diária</strong><span>Resumo automático das campanhas</span></div><button className="admin-toggle off" aria-label="Rotina diária" /></div>
              <div className="admin-setting"><div><strong>Operação automática</strong><span>Limite seguro de R$ 30 por plataforma</span></div><button className="admin-toggle off" aria-label="Operação automática" /></div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

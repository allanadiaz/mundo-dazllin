"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="auth">
      <section className="login-card">
        <form className="login-form" onSubmit={signIn}>
          <img className="login-logo" src="/dazllin-logo.png" alt="Dazllin" />
          <div className="login-heading">
            <h1>Bem-vindo à Dazllin</h1>
            <p>Acesse o painel da sua clínica.</p>
          </div>
          <label className="field">
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nome@empresa.com" required />
          </label>
          <label className="field">
            Senha
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Digite sua senha" required />
          </label>
          {error && <div className="alert">{error}</div>}
          <button className="primary" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar no painel"}
          </button>
          <p className="login-help">Acesso autorizado apenas para administradores e usuários cadastrados.</p>
        </form>
      </section>
    </main>
  );
}

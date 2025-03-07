"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
// 1. Importe o ícone do Lucide
import { LoaderCircle } from "lucide-react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setIsLoggingIn(false);

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      setErrorMessage(
        "Ops! Falha no login, verifique a senha e tente novamente."
      );
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Verificando sessão...</p>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-emerald-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-zinc-500">
          Login
        </h1>

        {errorMessage && (
          <div className="border-emerald-200 bg-emerald-100 rounded-xl p-2 mb-4 border-solid border-1">
            <p className="text-center text-emerald-900 font-regular">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1 text-zinc-500">
            Usuário
          </label>
          <input
            id="username"
            type="text"
            placeholder="email@exemplo.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-zinc-500 text-zinc-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1 text-zinc-500">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-zinc-500 text-zinc-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors disabled:bg-gray-400"
        >
          {isLoggingIn ? (
            <span className="flex items-center justify-center gap-2">
              {/* 2. Use o LoaderCircle com a animação spin do Tailwind */}
              <LoaderCircle className="animate-spin h-5 w-5 text-white" />
              Entrando...
            </span>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </main>
  );
}

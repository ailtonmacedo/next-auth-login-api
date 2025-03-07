"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 1. Importações para o Chart.js e react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// 2. Registro dos componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// 3. Exemplo de dados para o gráfico de linha
const lineData = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      label: "Vendas",
      data: [12, 59, 30, 50, 20, 80],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// 4. Configurações do gráfico de linha
const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Vendas Mensais",
    },
  },
};

// 5. Exemplo de dados para o gráfico de barras
const barData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Lucros (em $)",
      data: [4000, 3200, 5000, 4500],
      backgroundColor: "rgb(16, 185, 129)", // Tailwind emerald-500
    },
  ],
};

// 6. Configurações do gráfico de barras
const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Lucros Trimestrais",
    },
  },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Se não estiver autenticado, redireciona
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Exibe loading enquanto verifica a sessão
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Carregando sessão...</p>
      </div>
    );
  }

  // Caso não autenticado, não renderiza o conteúdo (useEffect fará o redirect)
  if (status === "unauthenticated") {
    return null;
  }

  // Função de logout
  const handleSignOut = () => {
    signOut();
  };

  return (
    <main className="flex flex-col items-end justify-center min-h-screen bg-emerald-900 p-4">
      <button
        onClick={handleSignOut}
        className=" bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors mb-4"
      >
        Sair do Aplicativo
      </button>
      <div className="w-full bg-white p-6 rounded shadow-md text-emerald-900">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mb-2">
          Bem-vindo(a)!
        </p>

        {/* <p className="mb-2">
          Bem-vindo(a),{" "}
          <span className="font-medium">
            {session?.user?.name || session?.user?.email}
          </span>
          !
        </p> */}
        {/* <p className="mb-4 block">Access Token: {session?.access_token}</p> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 7. Gráfico de Linha (Vendas Mensais) */}
          <div className="my-6">
            <Line data={lineData} options={lineOptions} />
          </div>

          {/* 8. Gráfico de Barras (Lucros Trimestrais) */}
          <div className="my-6">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

      </div>
    </main>
  );
}

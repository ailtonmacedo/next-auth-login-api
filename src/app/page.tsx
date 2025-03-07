export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-emerald-900">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-emerald-900">Página Inicial</h1>
        <a
          href="/login"
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors text-center"
        >
          Ir para Login
        </a>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>E-Commerce App</h1>
        <a
          href="/signup"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          Signup
        </a>
        <a
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          Login
        </a>
        <a
          href="/dashboard"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          Go to Dashboard
        </a>
      </main>
    </div>
  );
}

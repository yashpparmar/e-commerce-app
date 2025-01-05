export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="w-full text-center text-3xl">E-Commerce</h1>
        <a
          href="/signup"
          className="px-4 py-2 bg-blue-500 text-white text-center rounded-md shadow-md w-full"
        >
          Signup
        </a>
        <a
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white text-center rounded-md shadow-md w-full"
        >
          Login
        </a>
        <a
          href="/dashboard"
          className="px-4 py-2 bg-blue-500 text-white text-center rounded-md shadow-md w-full"
        >
          Go to Dashboard
        </a>
      </main>
    </div>
  );
}

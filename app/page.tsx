import Counter from "./components/Counter";

function WelcomeMessage()
{
  return (
    <section className="mt-6 rounded-lg shadow-sm border border-gray-200 bg-gray-50 p-5">
      <h2 className="text-xl font-semibold text-gray-900">My Next.js Journey</h2>
      <p className="mt-2 text-gray-600">
        I am learning components and Tailwind CSS in Next.js.
      </p>
    </section>
  );
}

export default function Home() {

  const name = "Shahrukh";
  const skill = "Laravel Developer";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold text-red-600">
        Welcome, {name}
      </h1>

      <p className="mt-3 text-lg text-red-600">
        I am a {skill} and I am learning Next.js.
      </p>

      <WelcomeMessage />
      <Counter />
    </main>
  );
}
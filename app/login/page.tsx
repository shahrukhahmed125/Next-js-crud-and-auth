import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/products",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect("/login?error=Invalid credentials");
      }

      throw error;
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        action={loginAction}
        className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm"
      >
        <h1 className="text-3xl font-bold">Login</h1>

        <div className="mt-6">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={6}
            required
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
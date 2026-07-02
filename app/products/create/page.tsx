import Link from "next/link";
import { redirect } from "next/navigation";
import { createProduct } from "../../lib/data";
import { revalidatePath } from "next/cache";

export default function CreateProductPage() {
  async function createProductAction(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString().trim() ?? "";
    const description = formData.get("description")?.toString().trim() ?? "";
    const price = Number(formData.get("price"));

    if (!name || !description || !price || price <= 0) {
      throw new Error("Please provide valid product details.");
    }

    const product = await createProduct({
      name,
      description,
      price,
    });

    revalidatePath("/products", "page");
    redirect("/products");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/products"
        className="text-sm font-medium text-red-600 hover:underline"
      >
        ← Back to products
      </Link>

      <section className="mt-6 rounded-lg border border-red-600 p-6">
        <h1 className="text-3xl font-bold">Create Product</h1>

        <form action={createProductAction} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="block font-medium">
              Product name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="price" className="block font-medium">
              Price (Rs.)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="1"
              required
              className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}
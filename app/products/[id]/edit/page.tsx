import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {getProductById, updateProduct } from "../../../lib/data";

type EditProductPageProps = {
params: Promise<{
id: string;
}>;
};

export default async function EditProductPage({params,}: EditProductPageProps) {
    const { id } = await params;
    const productId = Number(id);
    const product = await getProductById(productId);

    if (!product) {
        notFound();
    }

    async function updateProductAction(formData: FormData) {
        "use server";

        const name = formData.get("name")?.toString().trim() ?? "";
        const description = formData.get("description")?.toString().trim() ?? "";
        const price = Number(formData.get("price"));

        if (!name || !description || !price || price <= 0) {
            throw new Error("Please provide valid product details.");
        }

        await updateProduct(productId, {
            name,
            description,
            price,
        });

        revalidatePath("/products");
        revalidatePath(`/products/${productId}`);

        redirect(`/products/${productId}`);

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
        <h1 className="text-3xl font-bold">Edit Product</h1>

        <form action={updateProductAction} className="mt-6 space-y-5">
          <div>
            <label htmlFor="name" className="block font-medium">
              Product name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={product.name}
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
              defaultValue={product.description}
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
              defaultValue={Number(product.price)}
              min="1"
              required
              className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
          >
            Update
          </button>
        </form>
      </section>
    </main>
  );
}
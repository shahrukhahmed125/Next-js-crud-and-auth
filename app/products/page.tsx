import Link from "next/link";
import { getProducts } from "../lib/data";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mt-4 px-6">
      <Link
        href="/products/create"
        className="inline-block rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
      >
        <Plus className="inline-block h-4 w-4" />
        <span className="ml-2">Create Product</span>
      </Link>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">Products</h1>

        <div className="mt-6 grid gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="rounded-lg border border-red-600 p-5 transition hover:bg-red-50 hover:text-gray-900"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>

              <p className="mt-1 text-gray-600">
                Rs. {Number(product.price).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
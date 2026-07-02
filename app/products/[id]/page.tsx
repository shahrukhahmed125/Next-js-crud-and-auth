import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProductById, deleteProduct } from "../../lib/data";
import { Pencil, Trash } from "lucide-react";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  async function deleteProductAction() {
    "use server";

    await deleteProduct(productId);
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
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <p className="mt-3 text-lg text-gray-200">{product.description}</p>

        <p className="mt-5 text-2xl font-semibold">
          Rs. {Number(product.price).toLocaleString()}
        </p>
        <div className="flex gap-2 mt-2"> 
          <Link href={`/products/${product.id}/edit`} className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" >   
            <Pencil />
          </Link> 
          <form action={deleteProductAction}> 
            <button type="submit" className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700" > 
              <Trash /> 
            </button> 
          </form> 
        </div>
      </section>
    </main>
  );
}
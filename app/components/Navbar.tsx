import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-5 border-b border-red-600 px-6 py-4">
      <Link href="/" className="font-semibold text-red-600">
        Home
      </Link>

      <Link href="/about" className="text-red-600 hover:text-red-600">
        About
      </Link>

      <Link href="/products" className="text-red-600 hover:text-red-600">
        Products
      </Link>
    </nav>
  );
}
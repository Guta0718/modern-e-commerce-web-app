import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4">
    
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold hover:text-gray-300">
          Gebeya
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-lg font-semibold hover:text-gray-300">Home</Link>
          <Link href="/products" className="text-lg font-semibold hover:text-gray-300">Products</Link>
          <Link href="/about" className="text-lg font-semibold hover:text-gray-300">About</Link>
          <Link href="/cart" className="text-lg font-semibold hover:text-gray-300">Cart</Link>
          <Link href="/checkout" className="text-lg font-semibold hover:text-gray-300">Checkout</Link>
          <Link href="/login" className="text-lg font-semibold hover:text-gray-300">Login</Link>
        </div>
      </div>
    
    </nav>
  );
}

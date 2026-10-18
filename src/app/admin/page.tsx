import Link from "next/link";

export default function AdminPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <p>Welcome to the Gebeya administration area.</p>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/admin/products"
          className="rounded-lg border border-border p-5 hover:bg-muted"
        >
          Manage Products
        </Link>

        <Link
          href="/admin/users"
          className="rounded-lg border border-border p-5 hover:bg-muted"
        >
          Manage Users
        </Link>
      </div>
    </section>
  );
}

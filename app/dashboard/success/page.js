import Link from "next/link";

export default async function SuccessPage() {
  return (
    <main className="min-h-screen flex felx-col justify-center items-center gap-8">
      <h1 className="text-xl font-bold">Thanks for your purchase.</h1>
      <Link href="/dashboard" className="btn btn-primary">
        Go back to dashboard
      </Link>
    </main>
  );
}

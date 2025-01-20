import Link from "next/link";

export default function ButtonLogin({ isLoggedIn, name }) {
  if (isLoggedIn) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Welcome back {name}
      </Link>
    );
  }

  return <button>Login</button>;
}

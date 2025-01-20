import Link from "next/link";

export default function ButtonLogin({ isLoggedIn, name, extraStyle }) {
  console.log(extraStyle);

  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Welcome back {name}
      </Link>
    );
  }

  return <button>Login</button>;
}

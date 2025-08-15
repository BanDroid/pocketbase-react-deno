import { Link } from "react-router";

export default function Page() {
  return (
    <section>
      <h1>About Page</h1>
      <Link to="/redirect" reloadDocument>
        manual redirect
      </Link>
    </section>
  );
}

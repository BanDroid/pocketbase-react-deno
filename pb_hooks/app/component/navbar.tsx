import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-2 max-w-4xl mx-auto my-4 p-4 bg-slate-100 rounded-full">
      <Link
        to="/"
        reloadDocument
        className="w-8 h-8 bg-slate-800 rounded-full overflow-hidden"
      >
        <img
          src="https://i.imghippo.com/files/hYxm7633pCY.png"
          alt="bandroid.png"
          className="w-full h-full"
        />
      </Link>

      <menu className="flex items-center gap-2">
        <li>
          <Link to="/" className="link" reloadDocument>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="link" reloadDocument>
            About
          </Link>
        </li>
      </menu>
    </nav>
  );
}

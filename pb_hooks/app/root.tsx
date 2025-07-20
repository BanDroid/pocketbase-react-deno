import { Outlet } from "react-router";
import Navbar from "./component/navbar.tsx";

function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto my-4 p-4">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

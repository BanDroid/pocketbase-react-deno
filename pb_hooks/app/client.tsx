import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "@/root.tsx";
import { default as HomePage } from "@/pages/home/index.tsx";
import { default as AboutPage } from "@/pages/about/index.tsx";
import { default as PostPage } from "@/pages/posts/[id].tsx";
import Error from "./pages/error.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          errorElement: <Error status={window.locals.status} />,
          children: [
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/about",
              element: <AboutPage />,
            },
          ],
        },
      ])}
    />
  </>
);

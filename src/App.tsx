import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./pages/_Layout";
import { HomePage } from "./pages/Home";
import { ErrorPage } from "./pages/_404";
import { SearchPage } from "./pages/Search";

const toRouteElement = (children: JSX.Element): JSX.Element => (
  <Layout>{children}</Layout>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: toRouteElement(<HomePage />),
    errorElement: toRouteElement(<ErrorPage />),
  },
  {
    path: "/search",
    element: toRouteElement(<SearchPage />),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

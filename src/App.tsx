import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout } from "./pages/_Layout";
import { HomePage } from "./pages/Home";
import { ErrorPage } from "./pages/_404";
import { SearchMissionsPage } from "./pages/SearchMissions";
import { ShipPage, loader as shipPageLoader } from "./pages/ShipById";
import { SitePage, loader as sitePageLoader } from "./pages/SiteById";

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
    path: "/search-missions",
    element: toRouteElement(<SearchMissionsPage />),
  },
  {
    path: "/ships",
    element: <Navigate to="/search-missions" replace />,
  },
  {
    path: "/ships/:shipId",
    element: toRouteElement(<ShipPage />),
    loader: shipPageLoader,
  },
  {
    path: "/sites",
    element: <Navigate to="/search-missions" replace />,
  },
  {
    path: "/sites/:siteId",
    element: toRouteElement(<SitePage />),
    loader: sitePageLoader,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

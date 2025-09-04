import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormAuth from "../../pages/FormAuth";
import MapView from "../../pages/MapView";
import PredictBlock from "../../pages/PredictBlock";
import Analytics from "../../pages/Analytics";
import Settings from "../../pages/Settings";
import ErrorPage from "../../pages/ErrorPage";

// Основные пути маршрутов
const routes = createBrowserRouter([
  {
    path: "/",
    element: <FormAuth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/main",
    element: <MapView />,
  },
  {
    path: "/predict",
    element: <PredictBlock />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routes} />;
};

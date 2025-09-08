import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FormAuth from "@/pages/FormAuth";
import ErrorPage from "@/pages/ErrorPage";
import MainPage from "@/pages/MainPage";
import PredictBlock from "@/pages/PredictBlock";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";

// Основные пути маршрутов
const routes = createBrowserRouter([
  {
    path: "/",
    element: <FormAuth />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
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

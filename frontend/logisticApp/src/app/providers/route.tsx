import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "@/pages/AuthPage";
import ErrorPage from "@/pages/ErrorPage";
import MainPage from "@/pages/MainPage";
import PredictBlock from "@/pages/PredictBlock";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import RegisterPage from "@/pages/RegisterPage";
import Success from "@/pages/Success";

// Основные пути маршрутов
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/register/success",
    element: <Success />,
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

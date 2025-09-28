import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AnalyticsPage from "@/pages/AnalyticsPage";
import LoginPage from "@/pages/LoginPage";
import MainPage from "@/pages/MainPage";
import PredictPage from "@/pages/PredictPage";
import RegistrationPage from "@/pages/RegistrationPage";
import RouteErrorPage from "@/pages/RouteErrorPage";
import SettingsPage from "@/pages/SettingsPage";
import SuccessPage from "@/pages/SuccessPage";

// Основные пути маршрутов
const routes = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <RouteErrorPage />,
  },
  {
    path: "/register",
    children: [
      { index: true, element: <RegistrationPage /> },
      { path: "success", element: <SuccessPage /> },
    ],
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/predict",
    element: <PredictPage />,
  },
  {
    path: "/analytics",
    element: <AnalyticsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routes} />;
};

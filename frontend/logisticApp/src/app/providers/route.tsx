import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "@/layouts/ProtectedRoute";
import { PublicRoute } from "@/layouts/PublicRoute";
import AccountPage from "@/pages/AccountPage";
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
    errorElement: <RouteErrorPage />,
    children: [
      // Роуты, не требующие авторизации
      {
        element: <PublicRoute />,
        children: [
          {
            index: true,
            element: <LoginPage />, // Чтобы '/' не был просто пустым
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            children: [
              { index: true, element: <RegistrationPage /> },
              { path: "success", element: <SuccessPage /> },
            ],
          },
        ],
      },
      // Защищенные роуты (для авторизированных пользователей)
      {
        path: "app",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: "predict",
            element: <PredictPage />,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "settings",
            element: <SettingsPage />,
          },
          {
            path: "account",
            element: <AccountPage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={routes} />;
};

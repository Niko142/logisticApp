import { createBrowserRouter } from "react-router-dom";

import { AnalyticsPage } from "@/features/analytics";
import { LoginPage, RegisterPage, SuccessLoginPage } from "@/features/auth";
import { RouterErrorPage } from "@/features/error-route-handler";
import { MainPage } from "@/features/map-handler";
import { PredictPage } from "@/features/predict";
import { ProfilePage } from "@/features/user-account/profile";
import { SettingsPage } from "@/features/user-account/settings";

import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

// Основные пути маршрутов
export const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouterErrorPage />,
    children: [
      // Routes, не требующие авторизации
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
              { index: true, element: <RegisterPage /> },
              { path: "success", element: <SuccessLoginPage /> },
            ],
          },
        ],
      },
      // Защищенные route (для авторизированных пользователей)
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
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
]);

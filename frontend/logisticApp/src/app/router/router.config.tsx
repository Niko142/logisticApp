import { createBrowserRouter } from "react-router-dom";

import { ErrorHandler } from "@/components/errorBoundary";
import { AnalyticsPage } from "@/features/analytics";
import { LoginPage, RegisterPage, SuccessPage } from "@/features/auth";
import { MainPage } from "@/features/map-handler";
import { PredictPage } from "@/features/predict";
// import { ProfilePage } from "@/features/user-account/profile";
// import { SettingsPage } from "@/features/user-account/settings";

import { AuthGate } from "./AuthGate";

// Основные пути маршрутов
export const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorHandler />,
    element: <AuthGate />,
    children: [
      // Публичные страницы
      {
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
              { path: "success", element: <SuccessPage /> },
            ],
          },
        ],
      },
      // Защищенные страницы (для авторизированных пользователей)
      {
        path: "app",
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
          // {
          //   path: "settings",
          //   element: <SettingsPage />,
          // },
          // {
          //   path: "account",
          //   element: <ProfilePage />,
          // },
        ],
      },
    ],
  },
]);

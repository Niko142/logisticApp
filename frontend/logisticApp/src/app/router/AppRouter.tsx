import { RouterProvider } from "react-router-dom";

import { routes } from "./routes.config";

export const AppRouter = (): React.ReactElement => {
  return <RouterProvider router={routes} />;
};

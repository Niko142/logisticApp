import axios from "axios";

import { ROUTE_CONFIG } from "@/config/axios";

import { setupInterceptors } from "../interceptors/setupInterceptors";

// FIXME: Решить проблему со скоростью загрузки графа на production

const routeInstance = axios.create(ROUTE_CONFIG);

setupInterceptors(routeInstance);

export default routeInstance;

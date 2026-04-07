import axios from "axios";

import { ANALYTICS_CONFIG } from "@/config/axios";

import { setupInterceptors } from "../interceptors/setupInterceptors";

const analyticsInstance = axios.create(ANALYTICS_CONFIG);

setupInterceptors(analyticsInstance);

export default analyticsInstance;

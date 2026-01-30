import axios from "axios";

import { AUTH_CONFIG } from "@/config/axios";

import { setupInterceptors } from "../interceptors/setupInterceptors";

const authInstance = axios.create(AUTH_CONFIG);

setupInterceptors(authInstance);

export default authInstance;

import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { Platform } from "react-native";

// const API_URL = "http://10.0.2.2:3000/api"; // your local backend


const LOCAL_IP = "192.168.1.11";


export const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/api"
    : `http://${LOCAL_IP}:3000/api`;




const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Optional: Response interceptor for logging (no Sentry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        "API Error:",
        error.config?.method?.toUpperCase(),
        error.config?.url,
        "Status:",
        error.response.status
      );
    } else if (error.request) {
      console.warn("No response received:", error.config?.url);
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject(error);
  }
);

export const useApi = () => {
  const { getToken } = useAuth();

  const apiWithAuth = useCallback(
    async <T>(config: Parameters<typeof api.request>[0]) => {
      const token = await getToken();

      return api.request<T>({
        ...config,
        headers: {
          ...config.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },
    [getToken]
  );

  return { api, apiWithAuth };
};
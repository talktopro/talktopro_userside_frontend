import { useState, useEffect, useCallback } from "react";
import apiClient from "@/api/axiosInstance";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

interface UseApiResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    fetchData: (config?: AxiosRequestConfig, retryCount?: number) => Promise<void>;
}

const useApi = <T>(
    endpoint: string,
    method: "get" | "post" | "put" | "delete" = "get",
    initialConfig: AxiosRequestConfig = {},
    fetchOnMount: boolean = true
): UseApiResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(fetchOnMount);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (config: AxiosRequestConfig = {}, retryCount = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response: AxiosResponse<ApiResponse<T>> = await apiClient({
                url: endpoint,
                method,
                ...initialConfig,
                ...config,
            });
            setData(response.data.data);
        } catch (err) {
            if (retryCount < 3) {
                fetchData(config, retryCount + 1);
            } else {
                const errorMessage = err instanceof AxiosError && err.response?.data?.message
                    ? err.response.data.message
                    : `Failed to ${method} data from ${endpoint}. Please try again later.`;
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }, [endpoint, method, initialConfig]);

    useEffect(() => {
        const controller = new AbortController();
        if (fetchOnMount) {
            fetchData({ signal: controller.signal });
        }
        return () => {
            controller.abort();
        };
    }, [fetchData, fetchOnMount]);

    return { data, loading, error, fetchData };
};

export default useApi;

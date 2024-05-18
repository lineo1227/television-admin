import axios from "axios"
import type { json } from "ts-brand-json"
import type { AxiosRequestConfig, AxiosInstance } from "axios"
export class Http {
    instance: AxiosInstance
    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL
        })
    }
    get<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
        return this.instance.request<R>({
            ...config,
            url: url,
            params: query,
            method: 'get'
        })
    }
    post<R = unknown>(url: string, query?: Record<string, json>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
        return this.instance.request<R>({
            ...config,
            url: url,
            params: query,
            method: 'post'
        })
    }
    patch<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
        return this.instance.request<R>({
            ...config,
            url: url,
            params: query,
            method: 'patch'
        })
    }
    delete<R = unknown>(url: string, query?: Record<string, string>, config?: Omit<AxiosRequestConfig, 'params' | 'url' | 'method'>) {
        return this.instance.request<R>({
            ...config,
            url: url,
            params: query,
            method: 'delete'
        })
    }
}

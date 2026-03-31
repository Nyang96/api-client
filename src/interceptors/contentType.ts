import type { AxiosInstance } from 'axios';

/**
 * Content-Type 인터셉터
 * - FormData → Content-Type 삭제 (브라우저가 boundary 포함해서 자동 설정)
 * - Blob → Content-Type 삭제
 * - URLSearchParams → application/x-www-form-urlencoded
 * - 그 외 → 기본값(application/json) 유지
 */
export const setupContentTypeInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const data = config.data;

    if (data instanceof FormData || data instanceof Blob) {
      config.headers.delete('Content-Type');
    } else if (data instanceof URLSearchParams) {
      config.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    }

    return config;
  });
};
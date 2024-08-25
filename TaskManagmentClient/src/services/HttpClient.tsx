import axios, { CancelToken, AxiosInstance } from 'axios';

// Global Axios configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7040', // Replace with your actual base URL
  withCredentials: true,
});

export interface IHttp {
  get(url: string, headers?: object): Promise<any>;
  post(url: string, body?: object, headers?: object): Promise<any>;
  put(url: string, body?: object, headers?: object): Promise<any>;
  del(url: string, body?: object, headers?: object): Promise<any>;
  postFormData(url: string, file: any): Promise<any>;
  uploadFile(url: string, file: any, cancelToken: CancelToken): Promise<any>;
}

export class AxiosHttp implements IHttp {
  get(url: string, headers?: any): Promise<any> {
    return axiosInstance.get(url, { headers });
  }

  post(url: string, body?: any, headers?: any): Promise<any> {
    return axiosInstance.post(url, body, { headers });
  }

  put(url: string, body?: any, headers?: any): Promise<any> {
    return axiosInstance.put(url, body, { headers });
  }

  del(url: string, body?: any, headers?: any): Promise<any> {
    return axiosInstance.delete(url, { headers, data: body });
  }

  postFormData(url: string, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  uploadFile(url: string, file: any, cancelToken: CancelToken): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      cancelToken: cancelToken,
    });
  }
}
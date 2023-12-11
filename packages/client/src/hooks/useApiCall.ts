import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteLogin } from '../constants/router/router';

interface ResponseError {
  reason: string;
}

export const useApiCall = <F extends (body: any) => ReturnType<F>>(
  apiCall: F
) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const call = async (body: Parameters<F>) => {
    let res: ReturnType<F> | AxiosResponse<ResponseError> | undefined;
    try {
      setIsLoading(true);

      const response = await apiCall(body);
      res = (response as AxiosResponse<ReturnType<F>>).data;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (
          error.response?.status === 401 &&
          window.location.pathname !== getRouteLogin()
        ) {
          navigate(getRouteLogin());
        } else {
          res = error.response;
        }
      }
    } finally {
      setIsLoading(false);
    }
    return res;
  };

  return [call, isLoading] as [F, boolean];
};

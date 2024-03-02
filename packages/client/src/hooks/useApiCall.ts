import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteLogin } from '../constants/router/router';

interface ResponseError {
  reason: string;
}

const isAxiosResponse = (value: unknown): value is AxiosResponse => {
  return value && (value as AxiosResponse).data;
};

type CallResponseType<F extends (...body: Parameters<F>) => ReturnType<F>> =
  | (ReturnType<F> extends Promise<AxiosResponse<infer T>>
      ? T
      : ReturnType<F> extends Promise<infer T>
      ? T
      : ReturnType<F>)
  | AxiosResponse<ResponseError>
  | undefined;

export const useApiCall = <F extends (...data: Parameters<F>) => ReturnType<F>>(
  apiCall: F
) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const call = async (...body: Parameters<F>) => {
    let res: CallResponseType<F>;
    try {
      setIsLoading(true);

      const response = await apiCall(...body);
      res = isAxiosResponse(response) ? response.data : (response as any);
    } catch (error) {
      console.error(error);
      if (
        error instanceof AxiosError &&
        error.response?.status === 401 &&
        window.location.pathname !== getRouteLogin()
      ) {
        navigate(getRouteLogin());
      } else if (error instanceof AxiosError) {
        res = error.response;
      }
    } finally {
      setIsLoading(false);
    }
    return res;
  };

  return [call, isLoading] as [
    (...data: Parameters<F>) => Promise<CallResponseType<F>>,
    boolean
  ];
};

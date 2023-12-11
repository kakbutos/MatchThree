import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

interface ResponseError {
  reason: string;
}

export const useApiCall = <F extends (body: any) => ReturnType<F>>(
  apiCall: F
) => {
  const [isLoading, setIsLoading] = useState(false);

  const call = async (body: Parameters<F>) => {
    let res: ReturnType<F> | ResponseError | undefined;
    try {
      setIsLoading(true);

      const response = await apiCall(body);
      res = (response as AxiosResponse<ReturnType<F>>).data;
    } catch (error) {
      res = (error as AxiosError<ResponseError>).response?.data;
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    return res;
  };

  return [call, isLoading] as [F, boolean];
};

import { Endpoints } from "~/constants/endpoints";

export const useLogin = async (payload: Record<string, any>) => {
  return await useFetch(`http://localhost:8000${Endpoints.LOGIN}`, {
    method: "post",
    body: payload,
  });
};

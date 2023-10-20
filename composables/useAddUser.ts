import { Endpoints } from "~/constants/endpoints";

export const useAddUser = async (payload: Record<string, any>) => {
  return await useFetch(`http://localhost:8000${Endpoints.USERS}`, {
    method: "post",
    body: payload,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

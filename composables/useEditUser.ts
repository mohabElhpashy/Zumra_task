import { Endpoints } from "~/constants/endpoints";

export const useEditUser = async (payload: Record<string, any>, id: string) => {
  return await useFetch(`http://localhost:8000${Endpoints.USERS}/${id}`, {
    method: "put",
    body: payload,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

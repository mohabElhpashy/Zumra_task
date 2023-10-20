import { Endpoints } from "~/constants/endpoints";

export const useDeleteUser = async (id: string) => {
  return await useFetch(`http://localhost:8000${Endpoints.USERS}/${id}`, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

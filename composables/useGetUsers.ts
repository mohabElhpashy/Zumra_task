import { Endpoints } from "~/constants/endpoints";

export const useGetUsers = async (pageNumber?: number) => {
  return await useFetch(`http://localhost:8000${Endpoints.USERS}`, {
    params: {
      pageSize: 5,
      pageNumber,
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
};

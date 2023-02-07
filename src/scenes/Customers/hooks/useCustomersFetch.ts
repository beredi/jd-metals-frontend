import { useFetch } from "../../../hooks/useFetch";

export const useCustomersFetch = () => {
  const axiosInstance = useFetch();
  const getAllCustomers = () => {
    return axiosInstance.get("api/customers");
  };

  return { getAllCustomers };
};

import { useFetch } from "../../../hooks/useFetch";
import { Customer } from "../types/Customer";

export const useCustomersFetch = () => {
  const axiosInstance = useFetch();
  const getAllCustomers = () => {
    return axiosInstance.get("api/customers");
  };

  const createCustomer = (customer: Customer) => {
    return axiosInstance.post("api/customers", customer);
  };

  const bulkDeleteCustomers = (ids: number[]) => {
    return axiosInstance.post("api/customers/bulkDelete", { ids: ids });
  };

  const editCustomer = (customer: Customer) => {
    const body = {
      _method: "PUT",
      ...customer,
    };
    return axiosInstance.post(`api/customers/${customer.id}`, body);
  };

  const getCustomer = (id: number) => {
    return axiosInstance.get(`api/customers/${id}`);
  };

  const getProjectForCustomer = (customerId: number) => {
    return axiosInstance.post("api/customers/getProjectsForCustomer", {
      customerId: customerId,
    });
  };

  const deleteCustomer = (customerId: number) => {
    return axiosInstance.post(`api/customers/${customerId}`, {
      _method: "delete",
    });
  };

  return {
    getAllCustomers,
    createCustomer,
    bulkDeleteCustomers,
    editCustomer,
    getCustomer,
    getProjectForCustomer,
    deleteCustomer,
  };
};

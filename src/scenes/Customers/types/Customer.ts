export type Customer = {
  id?: number;
  is_company: number;
  name: string;
  lastname: string;
  email?: string;
  address?: string;
  phone?: string;
  company_name?: string;
  pib?: string;
  maticni_broj?: string;
};

export const initialCustomer: Customer = {
  is_company: 0,
  name: "",
  lastname: "",
  maticni_broj: "",
  pib: "",
  phone: "",
  email: "",
  address: "",
  company_name: "",
};

export const getCustomerTitleLabel = (customer: Customer) => {
  let returnValue: string;
  customer.is_company
    ? (returnValue =
        customer.company_name +
        "(" +
        customer.name +
        " " +
        customer.lastname +
        ")")
    : (returnValue = customer.name + " " + customer.lastname);

  return returnValue;
};

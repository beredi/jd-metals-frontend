interface Props {
  url: string;
  method?: RequestMethods;
  body?: Object;
}

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";

export const useSimpleQuery = ({ url, method = "GET", body }: Props) => {};

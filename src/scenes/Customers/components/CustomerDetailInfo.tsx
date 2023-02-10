import { Typography } from "@mui/material";

import { Customer } from "../types/Customer";
import { useTranslation } from "react-i18next";
import { DetailItem } from "../../../components/DetailItem";
import { Factory, Person } from "@mui/icons-material";

interface Props {
  customer: Customer;
}
export const CustomerDetailInfo = ({ customer }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        sx={{
          marginBottom: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {customer.is_company === 1 ? (
          <>
            <Factory sx={{ marginRight: 2 }} />
            {t("company")}
          </>
        ) : (
          <>
            <Person sx={{ marginRight: 2 }} />
            {t("person")}
          </>
        )}
      </Typography>

      <DetailItem keyString={"id"} value={customer.id!.toString()} />
      <DetailItem keyString={t("name")!} value={customer.name} />
      <DetailItem keyString={t("lastname")!} value={customer.lastname} />
      {customer.email && (
        <DetailItem keyString={t("email")!} value={customer.email} />
      )}
      {customer.address && (
        <DetailItem keyString={t("address")!} value={customer.address} />
      )}
      {customer.phone && (
        <DetailItem keyString={t("phone")!} value={customer.phone} />
      )}
      {customer.company_name && (
        <DetailItem
          keyString={t("companyName")!}
          value={customer.company_name}
        />
      )}
      {customer.pib && (
        <DetailItem keyString={t("pib")!} value={customer.pib} />
      )}
      {customer.maticni_broj && (
        <DetailItem
          keyString={t("maticniBroj")!}
          value={customer.maticni_broj}
        />
      )}
    </>
  );
};

import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { Customer } from "../types/Customer";
import { useTranslation } from "react-i18next";
import { DetailItem } from "../../../components/DetailItem";
import { toLower } from "lodash";
import { Factory, Person } from "@mui/icons-material";

interface Props {
  customer: Customer;
}
export const CustomerDetailInfo = ({ customer }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="h3"
        color={colors.greenAccent[100]}
        sx={{
          marginBottom: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {customer.is_company === 1 ? (
          <Factory sx={{ marginRight: 2 }} />
        ) : (
          <Person sx={{ marginRight: 2 }} />
        )}{" "}
        {t("details")}
      </Typography>

      <DetailItem keyString={"id"} value={customer.id!.toString()} />
      <DetailItem keyString={toLower(t("name")!)} value={customer.name} />
      <DetailItem
        keyString={toLower(t("lastname")!)}
        value={customer.lastname}
      />
      {customer.email && (
        <DetailItem keyString={toLower(t("email")!)} value={customer.email} />
      )}
      {customer.address && (
        <DetailItem
          keyString={toLower(t("address")!)}
          value={customer.address}
        />
      )}
      {customer.phone && (
        <DetailItem keyString={toLower(t("phone")!)} value={customer.phone} />
      )}
      {customer.company_name && (
        <DetailItem
          keyString={toLower(t("companyName")!)}
          value={customer.company_name}
        />
      )}
      {customer.pib && (
        <DetailItem keyString={toLower(t("pib")!)} value={customer.pib} />
      )}
      {customer.maticni_broj && (
        <DetailItem
          keyString={toLower(t("maticniBroj")!)}
          value={customer.maticni_broj}
        />
      )}
    </>
  );
};

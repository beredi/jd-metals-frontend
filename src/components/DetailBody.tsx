import { Box } from "@mui/material";
import { DetailMenuItemType } from "./DetailMenuItem";
import { useTranslation } from "react-i18next";
import { DetailMenu } from "./DetailMenu";
import { ReactNode } from "react";

interface Props {
  showDetail: boolean;
  customMenuItems: DetailMenuItemType[];
  children: ReactNode;
}
export const DetailBody = ({
  showDetail,
  customMenuItems,
  children,
}: Props) => {
  return (
    <Box
      gridColumn={showDetail ? "span 3" : "span 4"}
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <DetailMenu menuItems={customMenuItems} />
      {children}
    </Box>
  );
};

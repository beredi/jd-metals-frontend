import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}
export const DetailAccordion = ({
  children,
  title,
  defaultExpanded = false,
}: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        marginTop: 2,
        backgroundColor: `${colors.greenAccent[800]}`,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

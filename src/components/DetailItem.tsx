import { Box, Typography } from "@mui/material";
import { toLower } from "lodash";

interface Props {
  keyString: string;
  value: string;
}
export const DetailItem = ({ keyString, value }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: 1,
      }}
    >
      <Typography>{toLower(keyString)}: </Typography>
      <Typography sx={{ marginLeft: 1, fontWeight: "bold" }}>
        {value}
      </Typography>
    </Box>
  );
};

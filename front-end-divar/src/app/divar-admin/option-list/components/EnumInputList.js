"use client";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function EnumInputList({ enumList, setEnumList }) {
  const handleDelete = (chipToDelete) => () => {
    setEnumList((chips) => chips.filter((chip) => chip.id !== chipToDelete.id));
  };

  return (
    <ul dir="ltr" className="flex justify-center flex-wrap list-none p-1">
      {enumList.map((data) => {
        return (
          <ListItem key={data.id} dir="ltr">
            <Chip
              label={data.name}
              variant="outlined"
              color="primary"
              size="small"
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </ul>
  );
}

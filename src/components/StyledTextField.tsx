import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const TextFieldComponent = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: theme.spacing(1.6),
    paddingBottom: theme.spacing(1.6),
    paddingLeft: theme.spacing(1),
  },
}));

export const StyledTextField: React.FC<TextFieldProps> = (props) => (
  <TextFieldComponent variant="outlined" fullWidth {...props} />
);

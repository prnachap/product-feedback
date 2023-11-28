import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { useField } from "formik";
import isUndefined from "lodash/isUndefined";

type CustomInputProps = {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
};

const StyledInput = styled(TextField)({
  "& .MuiInputBase-root": {
    background: "#F7F8FD",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "#4661E6",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "1px",
      borderColor: "#4661E6",
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
});

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { label, helperText, ...otherProps } = props;
  const [field, meta] = useField(otherProps);
  const { touched, error } = meta;
  const className = `w-full rounded-md text-sm text-american-blue-100 font-normal transition-all`;

  return (
    <Box>
      <InputLabel
        htmlFor={otherProps.id}
        className="font-bold text-american-blue-100 text-[13px] md:text-[14px] cursor-pointer"
      >
        {label}
      </InputLabel>
      {helperText && (
        <FormHelperText className="text-dark-blue-gray text-[13px] md:text-[14px] m-0 mb-4">
          {helperText}
        </FormHelperText>
      )}
      <StyledInput
        className={className}
        error={touched && !isUndefined(error)}
        helperText={touched && error}
        {...field}
        {...otherProps}
      />
    </Box>
  );
};

export default CustomInput;

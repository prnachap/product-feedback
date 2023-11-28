import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useField } from "formik";
import isUndefined from "lodash/isUndefined";

type CustomSelectProps = {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  helperText?: string;
  options: string[];
};

const StyledSelect = styled(Select)({
  "& .MuiSelect-select": {
    background: "#F7F8FD",
  },
  "&:hover fieldset": {
    borderColor: "#4661E6 !important",
  },
  fieldset: {
    borderColor: "transparent",
  },
  "&.Mui-focused fieldset": {
    borderWidth: "1px !important",
    borderColor: "#4661E6 !important",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
});

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const { label, helperText, options, ...otherProps } = props;
  const [field, meta] = useField(otherProps);
  const { touched, error } = meta;
  const className = `w-full rounded-md text-sm text-american-blue-100 font-normal transition-all`;

  const renderOptions = () => {
    return options?.map((item) => (
      <MenuItem style={{ textTransform: "capitalize" }} key={item} value={item}>
        {item}
      </MenuItem>
    ));
  };

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
      <StyledSelect
        className={className}
        error={touched && !isUndefined(error)}
        {...field}
        {...otherProps}
      >
        {renderOptions()}
      </StyledSelect>
    </Box>
  );
};

export default CustomSelect;

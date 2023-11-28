import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { category, FORM_INITIAL_STATE, status } from "../../constants";
import useCreateFeedback from "../../hooks/useCreateFeedback";
import CreateIcon from "../../public/assets/shared/icon-new-feedback.svg";
import {
  getButtonTitle,
  getFormTitle,
  validationSchema,
} from "../../utils/formElementUtils";
import StyledButton from "../Button/StyledButton";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomInput from "../FormUI/CustomInput";
import CustomSelect from "../FormUI/CustomSelect";
import Overlay from "../Overlay/Overlay";

type CreateFeedbackFormProps = {
  title?: string;
};

const CreateFeedbackForm: React.FC<CreateFeedbackFormProps> = ({ title }) => {
  const formTitle = getFormTitle(title);
  const buttonTitle = getButtonTitle(title);

  const { isLoading, mutateAsync, isSuccess, isError, error } =
    useCreateFeedback();

  const handleSubmit = async (
    values: typeof FORM_INITIAL_STATE,
    action: FormikHelpers<typeof FORM_INITIAL_STATE>
  ) => {
    mutateAsync(values).then(() => {
      action.resetForm();
    });
  };

  const renderSnackbar = () => {
    const errorMessage =
      error?.response?.data?.error ?? "Something went wrong please try again!";

    if (isSuccess)
      return <CustomSnackbar message="Feedback created successfully" />;
    if (isError)
      return <CustomSnackbar message={errorMessage} severity="error" />;
  };

  const renderLoader = () => {
    if (!isLoading) return;
    return (
      <Overlay className="md:!block">
        <Box className="flex h-2/3 justify-center items-center">
          <CircularProgress />
        </Box>
      </Overlay>
    );
  };

  return (
    <Box className="bg-white rounded-lg relative">
      <Box className="absolute top-[-26px] left-6">
        <CreateIcon />
      </Box>
      <Box className="p-10">
        <Typography variant="h1" className="primary-text mb-6">
          {formTitle}
        </Typography>
        <Formik
          initialValues={FORM_INITIAL_STATE}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<typeof FORM_INITIAL_STATE>) => (
            <Form className="flex flex-col gap-4">
              <CustomInput
                id="title"
                name="title"
                label="Feedback Title"
                helperText="Add a short, descriptive headline"
              />

              <CustomSelect
                id="category"
                name="category"
                label="Category"
                helperText="Choose a category for your feedback"
                options={category}
              />
              <CustomSelect
                id="status"
                name="status"
                label="Status"
                helperText="Choose a feature state"
                options={status}
              />
              <CustomInput
                id="description"
                name="description"
                label="Feedback Detail"
                helperText="Include any specific comments on what should be improved,
                added, etc."
                multiline={true}
                rows={5}
              />
              <Box>
                <Box className="flex flex-col-reverse justify-center gap-4 mt-4 md:flex-row md:justify-end">
                  <StyledButton
                    className="btn-tertiary"
                    onClick={() => props.resetForm()}
                  >
                    Cancel
                  </StyledButton>
                  <StyledButton className="btn-primary" type="submit">
                    {buttonTitle}
                  </StyledButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      {renderLoader()}
      {renderSnackbar()}
    </Box>
  );
};

export default CreateFeedbackForm;

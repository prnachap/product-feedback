import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Form, Formik, FormikProps } from "formik";
import { FeedbackApiResType } from "../..";
import { category, status } from "../../constants";
import useDeleteFeedback from "../../hooks/useDeleteFeedback";
import useEditFeedback from "../../hooks/useEditFeedback";
import EditIcon from "../../public/assets/shared/icon-edit-feedback.svg";
import { getFormTitle, validationSchema } from "../../utils/formElementUtils";
import StyledButton from "../Button/StyledButton";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import CustomInput from "../FormUI/CustomInput";
import CustomSelect from "../FormUI/CustomSelect";
import Overlay from "../Overlay/Overlay";

type EditFeedbackFormProps = {
  feedbackData: FeedbackApiResType;
};

const EditFeedbackForm: React.FC<EditFeedbackFormProps> = ({
  feedbackData,
}) => {
  const formTitle = getFormTitle(feedbackData?.title);
  const { mutate, isError, isSuccess, isLoading, error } = useEditFeedback();

  const {
    mutate: mutateDelete,
    isSuccess: isSuccessForDelete,
    isError: isErrorForDelete,
    isLoading: isLoadingForDelete,
    error: errorForDelete,
  } = useDeleteFeedback();

  const {
    _id,
    title,
    category: feedbackCategory,
    status: feedbackStatus,
    description,
  } = feedbackData;

  const initialValue = {
    title: title,
    category: feedbackCategory,
    status: feedbackStatus,
    description: description,
  };

  const handleDelete = () => mutateDelete({ feedbackId: _id });

  const renderSnackbar = () => {
    const errorObject = errorForDelete ? errorForDelete : error;

    const errorMessage =
      errorObject?.response?.data?.error ??
      "Something went wrong please try again!";

    if (isSuccess || isSuccessForDelete)
      return <CustomSnackbar message="Changes were successfully" />;
    if (isError || isErrorForDelete)
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
        <EditIcon />
      </Box>
      <Box className="p-10">
        <Typography variant="h1" className="primary-text mb-6">
          {formTitle}
        </Typography>
        <Formik
          initialValues={initialValue}
          onSubmit={(values) => mutate({ ...values, feedbackId: _id })}
          validationSchema={validationSchema}
        >
          {(props: FormikProps<typeof initialValue>) => (
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

              <Box className="flex flex-col-reverse gap-4 mt-4 md:flex-row justify-between">
                <StyledButton className="btn-danger" onClick={handleDelete}>
                  Delete
                </StyledButton>
                <Box className="flex flex-col-reverse justify-center gap-4 md:flex-row md:justify-end">
                  <StyledButton
                    className="btn-tertiary"
                    onClick={() => props.resetForm()}
                  >
                    Cancel
                  </StyledButton>
                  <StyledButton className="btn-primary" type="submit">
                    Save Changes
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

export default EditFeedbackForm;

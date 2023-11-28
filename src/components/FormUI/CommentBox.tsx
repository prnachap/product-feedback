import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import { AxiosErrorType, CommentPayloadType, FeedbackApiResType } from "../..";
import { getRemainingWordCount } from "../../utils/formElementUtils";
import StyledButton from "../Button/StyledButton";
import CustomCard from "../UI/CustomCard";
import CustomInput from "./CustomInput";

const INITIAL_VALUE = {
  comment: "",
};
const validationSchema = Yup.object().shape({
  comment: Yup.string()
    .required("Can't be empty")
    .max(225, "Max characters exceeded"),
});
type CommentBoxProps = {
  mutate: UseMutateAsyncFunction<
    FeedbackApiResType,
    AxiosErrorType<FeedbackApiResType>,
    CommentPayloadType<string>,
    unknown
  >;
  feedbackId: string;
};
const CommentBox: React.FC<CommentBoxProps> = ({ mutate, feedbackId }) => {
  const handleSubmit = async (
    values: typeof INITIAL_VALUE,
    actions: FormikHelpers<typeof INITIAL_VALUE>
  ) => {
    mutate({ content: values.comment, feedbackId }).then(() => {
      actions.resetForm();
    });
  };
  return (
    <CustomCard>
      <Typography
        variant="h3"
        className="tertiary-text text-american-blue-100 mb-6"
      >
        Add Comment
      </Typography>
      <Formik
        initialValues={INITIAL_VALUE}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<typeof INITIAL_VALUE>) => (
          <Form>
            <CustomInput
              name="comment"
              id="comment"
              label=""
              multiline={true}
              rows={4}
            />
            <Box className="flex justify-between items-center mt-4">
              <Typography variant="body1" className="body-text">
                {`${getRemainingWordCount(
                  props?.values?.comment
                )} characters left`}
              </Typography>
              <StyledButton className="btn-primary" type="submit">
                Post Comment
              </StyledButton>
            </Box>
          </Form>
        )}
      </Formik>
    </CustomCard>
  );
};

export default CommentBox;

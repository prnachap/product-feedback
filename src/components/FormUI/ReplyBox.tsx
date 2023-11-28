import Box from "@mui/material/Box";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import StyledButton from "../Button/StyledButton";
import CustomInput from "./CustomInput";

export const INITIAL_VALUE = {
  reply: "",
};
const validationSchema = Yup.object().shape({
  reply: Yup.string().required("Can't be empty"),
});

type ReplyBoxProps = {
  feedbackId: string;
  commentId: string;
  handleSubmit: (
    values: typeof INITIAL_VALUE,
    action: FormikHelpers<typeof INITIAL_VALUE>
  ) => void;
};

const ReplyBox: React.FC<ReplyBoxProps> = ({
  feedbackId,
  commentId,
  handleSubmit,
}) => {
  return (
    <Formik
      initialValues={INITIAL_VALUE}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props: FormikProps<typeof INITIAL_VALUE>) => (
        <Form className="flex flex-col md:flex-row md:justify-between gap-4">
          <Box className="md:flex-1">
            <CustomInput
              name="reply"
              id="reply"
              label=""
              multiline={true}
              rows={4}
            />
          </Box>
          <Box className="flex justify-end md:block">
            <StyledButton className="btn-primary" type="submit">
              Post Reply
            </StyledButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ReplyBox;

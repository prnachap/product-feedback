"use client";

import { editFeedback } from "@/actions/feedback.action";
import {
  category as categoryOptions,
  status as statusOptions,
} from "@/constants";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { FeedbackSummary } from "../../..";
import EditIcon from "../../../public/assets/shared/icon-edit-feedback.svg";
import { getButtonTitle, getFormTitle } from "../../utils/formElementUtils";
import StyledButton from "../Button/StyledButton";
import DeleteForm from "../FormUI/DeleteForm";
import ErrorList from "../FormUI/ErrorLists";
import FormSubmissionButton from "../FormUI/FormSubmissionButton";
import Input from "../FormUI/Input";
import Select from "../FormUI/Select";
import Textarea from "../FormUI/Textarea";
import AlertCard from "../UI/AlertCard";

type EditFeedbackFormProps = { feedbackData: FeedbackSummary };
const EditFeedbackForm: React.FC<EditFeedbackFormProps> = ({
  feedbackData,
}) => {
  const { title, category, status, description } = feedbackData;
  const formTitle = getFormTitle(title);
  const buttonTitle = getButtonTitle(title);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [feedbackCategory, setFeedbackCategory] = useState(category);
  const [feedbackStatus, setFeedbackStatus] = useState(status);
  const editFeedbackAction = editFeedback.bind(
    null,
    feedbackData._id,
    feedbackCategory,
    feedbackStatus
  );

  const [state, dispatch] = useFormState(editFeedbackAction, {
    errors: {
      category: [],
      status: [],
      title: [],
      description: [],
    },
    status: null,
    formError: null,
  });
  const formRef = useRef<HTMLFormElement>(null);
  console.log("state updates", state);

  const onCategoryChange = (option: string) => setFeedbackCategory(option);
  const onStatusChange = (status: any) => setFeedbackStatus(status);

  const titleError = state?.errors?.title;
  const categoryError = state?.errors?.category;
  const statusError = state?.errors?.status;
  const descriptionError = state?.errors?.description;
  const formError = state.formError;

  const hasTitleError = Boolean(titleError?.length);
  const hasCategoryError = Boolean(categoryError?.length);
  const hasStatusError = Boolean(statusError?.length);
  const hasDescriptionError = Boolean(descriptionError?.length);
  const hasFormError = Boolean(formError);

  useEffect(() => {
    if (isEmpty(state?.errors) || !formRef.current) return;
    const elementWithError = document.querySelector('[aria-invalid="true"]');
    if (elementWithError instanceof HTMLElement) {
      elementWithError.focus();
    }
  }, [state]);

  return (
    <div className="bg-white rounded-lg relative mt-10">
      <div className="absolute top-[-26px] left-6">
        <EditIcon />
      </div>
      <div className="p-10">
        <h1 className="primary-text mb-6">{formTitle}</h1>
        <form
          action={dispatch}
          className="flex flex-col gap-4"
          aria-describedby="form-error"
          ref={formRef}
          id="edit-feedback-form"
        >
          <fieldset>
            <label htmlFor="title" className="input-label">
              Feedback Title
            </label>
            <small className="input-description">
              Add a short, descriptive headline
            </small>
            <Input
              id="title"
              autoFocus
              name="title"
              aria-describedby="title-error"
              defaultValue={title}
              aria-invalid={hasTitleError || undefined}
              className={titleError?.length ? `!border-jasper` : ""}
            />
            <ErrorList id="title-error" errors={titleError} />
          </fieldset>
          <fieldset>
            <label
              htmlFor="category"
              className="input-label"
              onClick={() =>
                selectRef instanceof HTMLElement
                  ? selectRef?.current?.focus?.()
                  : null
              }
            >
              Category
            </label>
            <small className="input-description">
              Choose a category for your feedback
            </small>
            <Select
              id="category"
              value={feedbackCategory}
              onChange={onCategoryChange}
              options={categoryOptions}
              ref={selectRef}
              aria-describedby="category-error"
              className={categoryError?.length ? `!border-jasper` : ""}
              aria-invalid={hasCategoryError || undefined}
            />
            <ErrorList id="category-error" errors={categoryError} />
          </fieldset>
          <fieldset>
            <label htmlFor="status" className="input-label">
              Status
            </label>
            <small className="input-description">Change feature state</small>
            <Select
              id="status"
              value={feedbackStatus}
              onChange={onStatusChange}
              options={statusOptions}
              aria-describedby="status-error"
              aria-invalid={hasStatusError || undefined}
              className={statusError?.length ? `!border-jasper` : ""}
            />
            <ErrorList id="status-error" errors={statusError} />
          </fieldset>
          <fieldset>
            <label htmlFor="description" className="input-label">
              Feedback Detail
            </label>
            <small className="input-description">
              Include any specific comments on what should be improved, added,
              etc.
            </small>
            <Textarea
              id="description"
              name="description"
              aria-describedby="description-error"
              defaultValue={description}
              aria-invalid={hasDescriptionError || undefined}
              className={descriptionError?.length ? `!border-jasper` : ""}
            />
            <ErrorList id="description-error" errors={descriptionError} />
          </fieldset>
          {hasFormError && <AlertCard severity="error" message={formError} />}
        </form>
        <div className="flex justify-between items-center mt-4">
          <DeleteForm feedbackId={feedbackData._id} />
          <div className="flex flex-col-reverse justify-center gap-4 md:flex-row md:justify-end">
            <StyledButton
              className="btn-tertiary"
              type="reset"
              form="edit-feedback-form"
            >
              Cancel
            </StyledButton>
            <FormSubmissionButton
              form="edit-feedback-form"
              title={buttonTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeedbackForm;

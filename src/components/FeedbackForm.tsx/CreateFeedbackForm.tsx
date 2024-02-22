"use client";

import { category, status } from "@/constants";
import { createFeedback } from "@/lib/actions";
import { Alert } from "@mui/material";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import CreateIcon from "../../../public/assets/shared/icon-new-feedback.svg";
import { getButtonTitle, getFormTitle } from "../../utils/formElementUtils";
import StyledButton from "../Button/StyledButton";
import ErrorList from "../FormUI/ErrorLists";
import FormSubmissionButton from "../FormUI/FormSubmissionButton";
import Input from "../FormUI/Input";
import Select from "../FormUI/Select";
import Textarea from "../FormUI/Textarea";

type CreateFeedbackFormProps = {
  title?: string;
};

const CreateFeedbackForm: React.FC<CreateFeedbackFormProps> = ({ title }) => {
  const formTitle = getFormTitle(title);
  const buttonTitle = getButtonTitle(title);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [feedbackCategory, setFeedbackCategory] = useState(category[0]);
  const [feedbackStatus, setFeedbackStatus] = useState(status[0]);
  const createFeedbackAction = createFeedback.bind(
    null,
    feedbackStatus,
    feedbackCategory
  );

  const [state, dispatch] = useFormState(createFeedbackAction, {
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

  const onCategoryChange = (option: string) => setFeedbackCategory(option);
  const onStatusChange = (status: any) => setFeedbackStatus(status);

  const titleError = state?.errors?.title;
  const categoryError = state?.errors?.category;
  const statusError = state?.errors?.status;
  const descriptionError = state?.errors?.description;
  const formError = state?.formError;

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
        <CreateIcon />
      </div>
      <div className="p-10">
        <h1 className="primary-text mb-6">{formTitle}</h1>
        <form
          action={dispatch}
          className="flex flex-col gap-4"
          aria-describedby="form-error"
          ref={formRef}
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
              options={category}
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
              options={status}
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
              aria-invalid={hasDescriptionError || undefined}
              className={descriptionError?.length ? `!border-jasper` : ""}
            />
            <ErrorList id="description-error" errors={descriptionError} />
          </fieldset>
          {hasFormError && <Alert severity="error">{formError}</Alert>}
          <div>
            <div className="flex flex-col-reverse justify-center gap-4 mt-4 md:flex-row md:justify-end">
              <StyledButton className="btn-tertiary" type="reset">
                Cancel
              </StyledButton>
              <FormSubmissionButton title={buttonTitle} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeedbackForm;

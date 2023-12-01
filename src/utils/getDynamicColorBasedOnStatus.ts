import { FeedbackType } from "../..";

export const getDynamicColorClassBasedOnStatus = ({
  name,
}: {
  name: FeedbackType["status"];
}) => {
  switch (name) {
    case "planned":
      return "border-color-planned";
    case "in-progress":
      return "border-color-inprogress";
    case "live":
      return "border-color-live";
  }
};

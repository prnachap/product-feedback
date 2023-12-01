import EmptyImage from "../../../public/assets/suggestions/illustration-empty.svg";
import clsx from "clsx";

const defaultContent = {
  title: "There is no feedback yet.",
  description:
    "Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.",
  isErrorButton: false,
};

type EmptyFeedbackProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const EmptyFeedback = ({
  title,
  description,
  children,
}: EmptyFeedbackProps) => {
  return (
    <div className="bg-white w-full rounded-lg h-full flex flex-col justify-center items-center py-8 lg:py-4">
      <div className="mb-6 md:mb-12">
        <EmptyImage />
      </div>
      <h1 className="primary-text capitalize">{title}</h1>
      <p
        className={clsx(
          `body-text w-[58%] text-center mt-3 md:mt-4 first-letter:capitalize`,
          {
            hidden: !description,
          }
        )}
      >
        {description}
      </p>
      {children}
    </div>
  );
};

export default EmptyFeedback;

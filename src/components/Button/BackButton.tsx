"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import IconLeft from "../../../public/assets/shared/icon-arrow-left.svg";
import StyledButton from "./StyledButton";

const BackButton = ({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) => {
  const router = useRouter();
  const handleBackNavigation = () => router.back();
  return (
    <StyledButton
      className={clsx(`btn-back-primary !p-0 ${className}`)}
      onClick={handleBackNavigation}
    >
      <IconLeft className={clsx(`mr-4 ${iconClassName}`)} />
      <h4 className="quaternary-text  capitalize">go back</h4>
    </StyledButton>
  );
};

export default BackButton;

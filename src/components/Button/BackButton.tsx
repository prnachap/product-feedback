"use client";

import { useRouter } from "next/navigation";
import IconLeft from "../../../public/assets/shared/icon-arrow-left.svg";
import StyledButton from "./StyledButton";

const BackButton = () => {
  const router = useRouter();
  const handleBackButton = () => router.back();
  return (
    <StyledButton className="btn-back-primary !p-0" onClick={handleBackButton}>
      <IconLeft className="mr-4" />
      <h4 className="quaternary-text  capitalize">go back</h4>
    </StyledButton>
  );
};

export default BackButton;

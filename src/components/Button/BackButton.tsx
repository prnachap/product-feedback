"use client";

import Link from "next/link";
import IconLeft from "../../../public/assets/shared/icon-arrow-left.svg";
import StyledButton from "./StyledButton";

const BackButton = ({ path }: { path?: string }) => {
  return (
    <Link href={path ?? "/feedback"}>
      <StyledButton className="btn-back-primary !p-0">
        <IconLeft className="mr-4" />
        <h4 className="quaternary-text  capitalize">go back</h4>
      </StyledButton>
    </Link>
  );
};

export default BackButton;

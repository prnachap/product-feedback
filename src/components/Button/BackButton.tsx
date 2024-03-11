"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import IconLeft from "../../../public/assets/shared/icon-arrow-left.svg";
import StyledButton from "./StyledButton";
import Link from "next/link";

export const LinkWrappedButton = ({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) => {
  return <Link href={href}>{children}</Link>;
};

const BackButton = ({
  className,
  iconClassName,
  href,
}: {
  className?: string;
  iconClassName?: string;
  href?: string;
}) => {
  const router = useRouter();
  const handleBackNavigation = () => router.back();

  const renderBackButton = () => {
    if (!href) {
      return (
        <StyledButton
          className={clsx(`btn-back-primary !p-0 ${className}`)}
          onClick={handleBackNavigation}
        >
          <IconLeft className={clsx(`mr-4 ${iconClassName}`)} />
          <h4 className="quaternary-text  capitalize">go back</h4>
        </StyledButton>
      );
    }

    return (
      <LinkWrappedButton href={href}>
        <StyledButton className={clsx(`btn-back-primary !p-0 ${className}`)}>
          <IconLeft className={clsx(`mr-4 ${iconClassName}`)} />
          <h4 className="quaternary-text  capitalize">go back</h4>
        </StyledButton>
      </LinkWrappedButton>
    );
  };

  return renderBackButton();
};

export default BackButton;

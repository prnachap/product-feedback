"use client";

import { verifyEmailAction } from "@/actions/auth.action";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import AlertCard from "../UI/AlertCard";
import CustomCard from "../UI/CustomCard";

const EmailVerificationForm = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });

  const alertStatus = status.success ? "success" : "error";

  const onSubmit = useCallback(async () => {
    setLoading(true);
    if (!token) {
      setStatus({ success: false, message: "Invalid token" });
      setLoading(false);
      return;
    }

    verifyEmailAction(token)
      .then((res) => {
        setStatus({ success: res.success, message: res.message });
        setLoading(false);
      })
      .catch((error) => {
        setStatus({ success: false, message: error.message });
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  const renderLoader = () => {
    if (!loading) return null;
    return <AnimatedLoader className="bg-purple-950" />;
  };

  const renderAlertCard = () => {
    if (!status.message || loading) return null;
    return <AlertCard severity={alertStatus} message={status.message} />;
  };

  return (
    <CustomCard className="flex flex-col gap-4 items-center">
      <p className="tertiary-text">Confirming your verification</p>
      {renderLoader()}
      {renderAlertCard()}
      <Link href="/auth/login">
        <button className="btn-primary">Back to login</button>
      </Link>
    </CustomCard>
  );
};

export default EmailVerificationForm;

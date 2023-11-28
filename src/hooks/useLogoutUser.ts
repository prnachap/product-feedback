import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosErrorType, FeedbackApiResType } from "..";
import { logoutUser } from "../services";

const useLogoutUser = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useQuery<{ success: boolean }, AxiosErrorType<string>>(
    ["logout-user"],
    logoutUser,
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );
};

export default useLogoutUser;

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosErrorType, FeedbackApiResType } from "..";
import { getCurrentLoggedInUser } from "../services";

export const useCurrentUser = ({
  onError,
  onSuccess,
}: {
  onError?: () => void;
  onSuccess?: () => void;
} = {}) => {
  return useQuery<Array<FeedbackApiResType>, AxiosErrorType<string>>(
    ["current-user"],
    getCurrentLoggedInUser,
    {
      refetchOnWindowFocus: false,
      staleTime: 1200000,
      onError,
      onSuccess,
      retry: 1,
    }
  );
};

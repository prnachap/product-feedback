"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../../route";

const Social = () => {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };
  return (
    <div className="flex justify-between items-center gap-2">
      <button
        className="btn-tertiary !w-full"
        onClick={() => handleClick("google")}
      >
        <GoogleIcon />
      </button>
      <button
        className="btn-tertiary !w-full"
        onClick={() => handleClick("github")}
      >
        <GitHubIcon />
      </button>
    </div>
  );
};

export default Social;

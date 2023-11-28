"use client";

import isUndefined from "lodash/isUndefined";
import React, { createContext, useContext, useReducer } from "react";
import { FeedbackApiResType } from "../..";

interface FeedbackState {
  feedbackData: FeedbackApiResType;
  isFeedbackDeletedSuccessful: boolean;
}

export enum FeedbackActionTypes {
  "GET_FEEDBACK" = "GET_FEEDBACK",
  "DELETE_SUCCESSFUL" = "DELETE_SUCCESSFUL",
}

const INITIAL_STATE: FeedbackState = {
  feedbackData: {
    _id: "",
    title: "",
    description: "",
    category: "",
    upVotes: [],
    comments: [],
    status: "planned",
  },
  isFeedbackDeletedSuccessful: false,
};

type FeedbackActions =
  | {
      type: FeedbackActionTypes.GET_FEEDBACK;
      payload: FeedbackApiResType;
    }
  | {
      type: FeedbackActionTypes.DELETE_SUCCESSFUL;
      payload: boolean;
    };

const reducer = (state: FeedbackState, action: FeedbackActions) => {
  const { type, payload } = action;
  switch (type) {
    case FeedbackActionTypes.GET_FEEDBACK:
      return { ...state, feedbackData: payload };
    case FeedbackActionTypes.DELETE_SUCCESSFUL:
      return { ...state, isFeedbackDeletedSuccessful: payload };
  }
};

export const FeedbackStateContext = createContext<FeedbackState>(INITIAL_STATE);

export const FeedbackDispatchContext = createContext<
  React.Dispatch<FeedbackActions> | undefined
>(undefined);

export const useFeedbackState = () => {
  const context = useContext(FeedbackStateContext);
  if (isUndefined(context)) {
    throw new Error(`useFeedbackState must be used within a FeedbackProvider`);
  }
  return context;
};

export const useFeedbackDispatch = () => {
  const context = useContext(FeedbackDispatchContext);
  if (isUndefined(context)) {
    throw new Error(
      `useFeedbackDispatch must be used within a FeedbackProvider`
    );
  }
  return context;
};

type FeedbackProviderProps = { children?: React.ReactNode };
const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <FeedbackStateContext.Provider value={state}>
      <FeedbackDispatchContext.Provider value={dispatch}>
        {children}
      </FeedbackDispatchContext.Provider>
    </FeedbackStateContext.Provider>
  );
};

export default FeedbackProvider;

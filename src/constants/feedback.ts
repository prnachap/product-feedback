import { FeedbackType } from "../..";

export const category = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

export const status: FeedbackType["status"][] = [
  "planned",
  "in-progress",
  "live",
];

export const sortBy = [
  "most upvotes",
  "least upvotes",
  "most comments",
  "least comments",
];

export const COLOR_FOR_STATUS = {
  planned: "#F49F85",
  "in-progress": "#AD1FEA",
  live: "#62BCFA",
};

export const FORM_INITIAL_STATE = {
  title: "",
  category: "",
  status: "",
  description: "",
};

export const dummyDataOne: FeedbackType[] = Array(2).fill({
  title: "More comprehensive reports",
  description:
    "It would be great to see a more detailed breakdown of solutions.",
  category: "Feature",
  upVotes: 12,
  comments: 2,
  status: "live",
});
export const dummyDataTwo: FeedbackType[] = Array(15).fill({
  title: "More comprehensive reports",
  description:
    "It would be great to see a more detailed breakdown of solutions.",
  category: "Feature",
  upVotes: 12,
  comments: 2,
  status: "planned",
});
export const dummyDataThree: FeedbackType[] = Array(5).fill({
  title: "More comprehensive reports",
  description:
    "It would be great to see a more detailed breakdown of solutions.",
  category: "Feature",
  upVotes: 12,
  comments: 2,
  status: "in-progress",
});

// Loading animation
export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

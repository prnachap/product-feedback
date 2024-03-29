import { AxiosError } from "axios";

declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

type CommentType = {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
    username: string;
  };
  replyTo?: string;
  comments: CommentType[];
};

type FeedbackType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  totalVotes: number;
  totalComments: number;
  upvotes: string[];
  comments: CommentType[];
  status: "planned" | "in-progress" | "live";
};

type RoadMapStatsType = {
  _id: "planned" | "in-progress" | "live";
  count: number;
};

type FeedbackSummary = Omit<FeedbackType, "comments" | "upvotes">;

type FeedbackApiResType = FeedbackType & { comments: CommentType[] };

type AxiosErrorType<T> = AxiosError<{
  data: T[];
  error: string;
}>;

type FormType = { status: string } & Pick<
  FeedbackType,
  "title" | "description" | "category"
>;

type CommentPayloadType<T> = { content: T; feedbackId: T };
type ReplyPayloadType<T> = CommentPayloadType<T> & { commentId: T };

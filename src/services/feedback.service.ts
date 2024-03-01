import { mongooseConnect } from "@/lib/mongoose";
import FeedbackModel, {
  IFeedback,
  IFeedbackModel,
} from "@/models/feedback.model";
import { FilterQuery, QueryOptions } from "mongoose";

export const findFeedback = async (
  filter: FilterQuery<IFeedback>,
  queryOptions: QueryOptions<IFeedback>
): Promise<IFeedbackModel | null> => {
  await mongooseConnect();
  return await FeedbackModel.findOne<IFeedbackModel>(
    filter,
    {},
    queryOptions ?? {}
  );
};

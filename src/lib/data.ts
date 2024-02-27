import { ERROR_MESSAGES } from "@/constants/errorMessages";
import clientPromise from "@/lib/mongodb";
import FeedbackModel from "@/models/feedback.model";
import { isEqual } from "lodash";
import { ObjectId } from "mongodb";
import { unstable_noStore as noStore } from "next/cache";
import {
  CommentType,
  FeedbackSummary,
  FeedbackType,
  RoadMapStatsType,
} from "../..";
import initializeDB from "./initializeDB";

function getSortingOrder(sortBy: string) {
  switch (sortBy) {
    case "most upvotes":
      return { totalVotes: -1 };
    case "least upvotes":
      return { totalVotes: 1 };
    case "most comments":
      return { totalComments: -1 };
    case "least comments":
      return { totalComments: 1 };
  }
}

function getFilterFields(category: string) {
  if (isEqual(category, "all")) return {};
  return {
    category: {
      $regex: new RegExp(category, "i"),
    },
  };
}

export async function getFeedbackSummary({
  category,
  sortBy,
}: {
  category: string;
  sortBy: string;
}) {
  noStore();
  const sortingOrder = getSortingOrder(sortBy);
  const filter = getFilterFields(category);

  try {
    const client = await clientPromise;
    const collection = client.db("product-feedback").collection("feedbacks");
    return await collection
      .aggregate<FeedbackSummary>([
        { $match: { ...filter } },
        {
          $addFields: {
            totalComments: { $size: "$comments" },
            totalVotes: { $size: "$upvotes" },
          },
        },
        {
          $project: {
            comments: 0,
            upvotes: 0,
          },
        },
        {
          $sort: {
            ...sortingOrder,
          },
        },
      ])
      .toArray();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }
}

export async function getFeedbackById({ id }: { id: string }) {
  noStore();

  try {
    const client = await clientPromise;
    const collection = client.db("product-feedback").collection("feedbacks");
    return await collection
      .aggregate<FeedbackSummary>([
        { $match: { _id: new ObjectId(id) } },
        {
          $addFields: {
            totalComments: { $size: "$comments" },
            totalVotes: { $size: "$upvotes" },
          },
        },
        {
          $project: {
            comments: 0,
            upvotes: 0,
          },
        },
      ])
      .next();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }
}
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCommentsByFeedbackId({ id }: { id: string }) {
  noStore();
  await sleep(15000);
  try {
    await initializeDB();
    const feedbackDetails = (await FeedbackModel.findOne({
      _id: id,
    })
      .lean()
      .select({ _id: 0, user: 0, comments: 1 })) as { comments: CommentType[] };
    return feedbackDetails;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }
}

export const getRoadMapStatistics = async () => {
  noStore();
  try {
    const client = await clientPromise;
    const collection = client.db("product-feedback").collection("feedbacks");
    return await collection
      .aggregate<RoadMapStatsType>([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ])
      .toArray();
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }
};

export const getFeedbackByStatus = async (category: FeedbackType["status"]) => {
  try {
    const client = await clientPromise;
    const collection = client.db("product-feedback").collection("feedbacks");
    const result = await collection
      .aggregate<FeedbackSummary>([
        { $match: { status: category } },
        {
          $addFields: {
            totalComments: { $size: "$comments" },
            totalVotes: { $size: "$upvotes" },
          },
        },
        {
          $project: {
            comments: 0,
            upvotes: 0,
          },
        },
      ])
      .toArray();
    return result;
  } catch (error) {
    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
  }
};

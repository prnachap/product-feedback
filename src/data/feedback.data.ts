import { MESSAGES } from "@/constants/messages";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
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

/**
 * Returns the sorting order object based on the provided sortBy parameter.
 * @param sortBy - The sorting criteria.
 * @returns The sorting order object.
 */
function getSortingOrder(sortBy: string): Record<string, 1 | -1> {
  switch (sortBy) {
    case "most upvotes":
      return { totalVotes: -1 };
    case "least upvotes":
      return { totalVotes: 1 };
    case "most comments":
      return { totalComments: -1 };
    case "least comments":
      return { totalComments: 1 };
    default:
      return { totalComments: 1 };
  }
}

/**
 * Returns the filter fields based on the provided category.
 * If the category is "all", an empty object is returned.
 * Otherwise, a filter object with a regex pattern matching the category is returned.
 * @param category - The category to filter by.
 * @returns The filter fields object.
 */
function getFilterFields(category: string):
  | {
      category?: undefined;
    }
  | {
      category: {
        $regex: RegExp;
      };
    } {
  if (isEqual(category, "all")) return {};
  return {
    category: {
      $regex: new RegExp(category, "i"),
    },
  };
}

/**
 * Retrieves the summary of feedback based on the specified category and sorting order.
 * @param {Object} options - The options for retrieving feedback summary.
 * @param {string} options.category - The category of feedback to retrieve.
 * @param {string} options.sortBy - The sorting order for the feedback summary.
 * @returns {Promise<FeedbackSummary[]>} - A promise that resolves to an array of feedback summaries.
 * @throws {Error} - If there is an error retrieving the feedback summary.
 */
export async function getFeedbackSummary({
  category,
  sortBy,
}: {
  category: string;
  sortBy: string;
}): Promise<FeedbackSummary[]> {
  noStore();
  const sortingOrder = getSortingOrder(sortBy);
  const filter = getFilterFields(category);

  try {
    await mongooseConnect();
    return await FeedbackModel.aggregate<FeedbackSummary>([
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
        $sort: sortingOrder,
      },
    ]);
  } catch (error) {
    throw new Error(MESSAGES.SERVER_ERROR);
  }
}

/**
 * Retrieves feedback by its ID.
 * @param {Object} params - The parameters for retrieving feedback.
 * @param {string} params.id - The ID of the feedback.
 * @returns {Promise<FeedbackSummary | null>} - The feedback summary or null if not found.
 * @throws {Error} - Throws an error if there is a server error.
 */
export async function getFeedbackById({
  id,
}: {
  id: string;
}): Promise<FeedbackSummary[] | null> {
  noStore();

  try {
    await mongooseConnect();
    return await FeedbackModel.aggregate<FeedbackSummary>([
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
    ]);
  } catch (error) {
    throw new Error(MESSAGES.SERVER_ERROR);
  }
}

/**
 * Retrieves comments by feedback ID.
 * @param {Object} params - The parameters for retrieving comments.
 * @param {string} params.id - The ID of the feedback.
 * @returns {Promise<{ comments: CommentType[] }>} - The comments associated with the feedback.
 * @throws {Error} - If there is a server error.
 */
export async function getCommentsByFeedbackId({
  id,
}: {
  id: string;
}): Promise<{ comments: CommentType[] }> {
  noStore();
  try {
    await mongooseConnect();
    const feedbackDetails = (await FeedbackModel.findOne({
      _id: id,
    })
      .lean()
      .select({ _id: 0, user: 0, comments: 1 })) as { comments: CommentType[] };
    return feedbackDetails;
  } catch (error) {
    throw new Error(MESSAGES.SERVER_ERROR);
  }
}

/**
 * Retrieves the statistics for the roadmap based on the feedback data.
 * @returns A promise that resolves to an array of RoadMapStatsType objects representing the statistics.
 * @throws {Error} If there is a server error.
 */
export const getRoadMapStatistics = async (): Promise<RoadMapStatsType[]> => {
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
    throw new Error(MESSAGES.SERVER_ERROR);
  }
};

/**
 * Retrieves feedback summaries by status.
 * @param category - The status category of the feedbacks to retrieve.
 * @returns A promise that resolves to an array of feedback summaries.
 * @throws {Error} If there is a server error.
 */
export const getFeedbackByStatus = async (
  category: FeedbackType["status"]
): Promise<FeedbackSummary[]> => {
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
    throw new Error(MESSAGES.SERVER_ERROR);
  }
};

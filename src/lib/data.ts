import { ERROR_MESSAGES } from "@/constants/errorMessages";
import clientPromise from "@/lib/mongodb";
import { isEqual } from "lodash";
import { unstable_noStore as noStore } from "next/cache";
import { FeedbackSummary, RoadMapStatsType } from "../..";

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

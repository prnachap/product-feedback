import { mongooseConnect } from "@/lib/mongoose";
import VerificationModel, {
  IVerification,
  IVerificationModel,
} from "@/models/verification.model";
import { DeleteResult } from "mongodb";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export const updateVerificationToken = async (
  filterQuery: FilterQuery<IVerification>,
  update: UpdateQuery<IVerification>,
  options: QueryOptions<IVerification>
): Promise<IVerificationModel | null> => {
  await mongooseConnect();
  return VerificationModel.findOneAndUpdate<IVerificationModel>(
    filterQuery,
    update,
    options
  );
};

export const findToken = async (
  query: FilterQuery<IVerification>,
  options?: QueryOptions<IVerification>
): Promise<IVerificationModel | null> => {
  await mongooseConnect();
  return await VerificationModel.findOne<IVerificationModel>(
    query,
    {},
    options ?? {}
  );
};

export const deleteToken = async (
  query: FilterQuery<IVerification>
): Promise<DeleteResult> => {
  await mongooseConnect();
  return await VerificationModel.deleteMany(query);
};

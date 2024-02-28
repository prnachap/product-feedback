import { mongooseConnect } from "@/lib/mongoose";
import VerificationModel, { IVerification } from "@/models/verification.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export const updateVerificationToken = async (
  filterQuery: FilterQuery<IVerification>,
  update: UpdateQuery<IVerification>,
  options: QueryOptions<IVerification>
) => {
  await mongooseConnect();
  return VerificationModel.findOneAndUpdate(filterQuery, update, options);
};

export const findToken = async (
  query: FilterQuery<IVerification>,
  options?: QueryOptions<IVerification>
) => {
  await mongooseConnect();
  return await VerificationModel.findOne<IVerification>(
    query,
    {},
    options ?? {}
  );
};

export const deleteToken = async (query: FilterQuery<IVerification>) => {
  await mongooseConnect();
  return await VerificationModel.deleteMany(query);
};

import UserModel, { IUser, IUserModel } from "@/models/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { mongooseConnect } from "../lib/mongoose";

export const createUser = async (
  input: Partial<IUser>
): Promise<IUserModel> => {
  return await UserModel.create<IUserModel>(input);
};

export const findUser = async (
  query: FilterQuery<IUser>,
  options?: QueryOptions<IUser>
): Promise<IUserModel | null> => {
  await mongooseConnect();
  return await UserModel.findOne<IUserModel>(query, {}, options ?? {});
};

export const updateUser = async (
  filteQuery: FilterQuery<IUser>,
  updateQuery: UpdateQuery<IUser>,
  queryOptions?: QueryOptions<IUser>
): Promise<IUserModel | null> => {
  await mongooseConnect();
  return await UserModel.findOneAndUpdate<IUserModel>(
    filteQuery,
    updateQuery,
    queryOptions ?? {}
  );
};

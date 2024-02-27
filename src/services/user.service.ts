import UserModel, { IUser } from "@/models/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import moongooseConnect from "../lib/initializeDB";

export const findUser = async (
  query: FilterQuery<IUser>,
  options?: QueryOptions<IUser>
) => {
  await moongooseConnect();
  return await UserModel.findOne<IUser>(query, {}, options ?? {});
};

export const updateUser = async (
  filteQuery: FilterQuery<IUser>,
  updateQuery: UpdateQuery<IUser>,
  queryOptions?: QueryOptions<IUser>
) => {
  await moongooseConnect();
  return await UserModel.findOneAndUpdate(
    filteQuery,
    updateQuery,
    queryOptions ?? {}
  );
};

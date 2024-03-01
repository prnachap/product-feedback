import { mongooseConnect } from "@/lib/mongoose";
import TwoFactorConfirmationModel, {
  ITwoFactorConfirmation,
  ITwoFactorConfirmationModel,
} from "@/models/twoFactorConfirmation.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export const findTwoFactorToken = async (
  filter: FilterQuery<ITwoFactorConfirmation>,
  queryOptions?: QueryOptions<ITwoFactorConfirmation>
): Promise<ITwoFactorConfirmationModel | null> => {
  await mongooseConnect();
  return await TwoFactorConfirmationModel.findOne<ITwoFactorConfirmationModel>(
    filter,
    {},
    queryOptions ?? {}
  );
};

export const updateTwoFactorToken = async (
  filteQuery: FilterQuery<ITwoFactorConfirmation>,
  updateQuery: UpdateQuery<ITwoFactorConfirmation>,
  queryOptions?: QueryOptions<ITwoFactorConfirmation>
): Promise<ITwoFactorConfirmationModel | null> => {
  await mongooseConnect();
  return await TwoFactorConfirmationModel.findOneAndUpdate<ITwoFactorConfirmationModel>(
    filteQuery,
    updateQuery,
    queryOptions ?? {}
  );
};

export const deleteTwoFactorToken = async (
  query: FilterQuery<ITwoFactorConfirmation>
) => {
  await mongooseConnect();
  return await TwoFactorConfirmationModel.findOneAndDelete(query);
};

export const createTwoFactorToken = async (
  input: Partial<ITwoFactorConfirmation>
): Promise<ITwoFactorConfirmationModel> => {
  return await TwoFactorConfirmationModel.create<ITwoFactorConfirmationModel>(
    input
  );
};

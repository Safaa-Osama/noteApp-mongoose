import { model } from "mongoose";

export const create = async ({ model, data } = {}) => {
    return await model.create(data);
}

export const findOne = async ({ model, filter = {} } = {}) => {
    return await model.findOne(filter);
}

export const updateOne = async ({ model, filter = {}, update = {}, options = {} } = {}) => {
    const doc = await model.findOneAndUpdate(filter, update, { runValidators: true, new: true, ...options });
    return doc;
}

export const deleteOne = async ({ model, filter = {} } = {}) => {
    return await model.deleteOne(filter);
}

export const findAll = async (model) => {
    return await model.find();
}

import { model } from "mongoose";

export const create = async ({ model, data } = {}) => {
    return await model.create(data);
}

export const findOne = async ({ model, filter = {} } = {}) => {
    return await model.findOne(filter);
}

export const find = async ({ model, filter = {} } = {}) => {
    return await model.find(filter).exec();
}

export const updateOne = async ({ model, filter = {}, update = {}, options = {} } = {}) => {
    const doc = await model.findOneAndUpdate(filter, update, { runValidators: true, new: true, ...options });
    return doc;
}

export const updateMany = async ({ model, filter = {}, update = {}, options = {} } = {}) => {
   return await model.updateMany(filter, update, { runValidators: true,...options });
  
}

export const deleteOne = async ({ model, filter = {} } = {}) => {
    return await model.deleteOne(filter);
}

export const findOneSelect = async ({model, filter={}, fields={}})=>{
    return await model.find({filter}).select({fields})
}

export const deleteMany = async ({ model, filter = {} } = {}) => {
    return await model.deleteMany(filter);
}

export const findAll = async (model) => {
    return await model.find();
}

export const replaceOne = async ({model, replacement={}, filter={}, options={}}) => {
    return await model.replaceOne(  filter,  replacement,   options);
}

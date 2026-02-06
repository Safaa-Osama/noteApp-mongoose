export const create = async ({ model, data } = {}) => {
    return await model.create(data);
}

export const findOne = async ({ model, filter = {} } = {}) => {
    return await model.findOne(filter);
}

export const updateOne = async ({ model, filter = {}, update = {}, options = {} } = {}) => {
    const doc = await model.findOne(filter, update, { runValidator: true, ...options });
    return doc.exec();
}
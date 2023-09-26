import FinancialRecordModel from "../models/FinancialRecordModel";

export const getAllRecordsByUserId = async (userId: string) => {
  return await FinancialRecordModel.findAll({ where: { user_id: userId } });
};

export const createRecord = async (recordData: any) => {
  return await FinancialRecordModel.create(recordData);
};

export const updateRecordById = async (id: string, updatedData: any) => {
  const record = await FinancialRecordModel.findByPk(id);
  if (record) {
    await record.update(updatedData);
    return record;
  }
  return null;
};

export const deleteRecordById = async (id: string) => {
  const record = await FinancialRecordModel.findByPk(id);
  if (record) {
    await record.destroy();
    return true;
  }
  return false;
};

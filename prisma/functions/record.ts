import { Prisma, Record } from "@prisma/client";
import prisma from "./client";

export const prismaRecordsFindMany = async (page: number): Promise<any[]> => {
  const records = await prisma.record.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      detail: true,
      finished: true,
      createdAt: false,
      updatedAt: true,
    },
    orderBy: { updatedAt: Prisma.SortOrder.desc },
    skip: 10 * page, //件数制限
    take: 10, //件数制限
  });
  // レコード件数
  const recordsCount = await prismaRecordsCount();
  return [records, recordsCount];
};

// レコード件数取得
export const prismaRecordsCount = async (): Promise<number> => {
  const recordsCount = await prisma.record.count();
  return recordsCount;
};

// ある記事に関する情報を取得する
export const prismaRecordFindOne = async (id: number): Promise<Record[]> => {
  const checkedRecord = await prisma.record.findMany({
    where: {
      id: id,
    },
  });
  return checkedRecord;
};

// ある記事に関する情報を取得する
export const prismaRecordFindOneByTitle = async (condition: string): Promise<Record[]> => {
  const records = await prisma.record.findMany({
    where: {
      title: {
        contains: condition,
      },
    },
  });
  return records;
};

// 当月のデータを取得
export const prismaRecordsGroupByDay = async (yearMonth: string): Promise<any[]> => {
  const records = await prisma.record.groupBy({
    by: ["createdAtDate"],
    _count: {
      id: true,
    },
    where: {
      createdAtDate: {
        startsWith: yearMonth,
      },
    },
    orderBy: {
      createdAtDate: Prisma.SortOrder.asc,
    },
  });
  return records;
};

/* 記録を新規保存 */
export const prismaRecordCreate = async (
  // param: Omit<Record, 'id'>,
  param: Record,
): Promise<Record> => {
  const record = await prisma.record.create({
    data: param,
  });
  return record;
};

/* 記録を更新 */
export const prismaRecordUpdate = async (id: number, param: Record): Promise<Record> => {
  const record = await prisma.record.update({
    where: { id: id },
    data: param,
  });
  return record;
};

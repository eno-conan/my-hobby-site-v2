import { Record } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prismaRecordCreate, prismaRecordFindOne, prismaMaxRecordId } from "../../../../prisma/functions/record";
import { prismaRecordRefsCreate } from "../../../../prisma/functions/recordRef";
// import { formatToTimeZone } from 'date-fns-timezone';

/**
 * Next.js の API 定義
 *
 * @param req リクエスト
 * @param res レスポンス
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { method, body, query } = req;

  switch (method) {
    // 特定のデータ取得
    case "GET":
      const detail: Record[] = await prismaRecordFindOne(Number(query.id));
      let info = detail[0];
      res.status(200).json(info);
      break;

    //新規データ登録
    case "POST":
      if (!body) return res.status(400).end("No body");
      // 記録IDの最大値を取得し、1足した値で登録
      const maxRecordId = await prismaMaxRecordId();
      const recordId: number = Number(maxRecordId[0].id) + 1;

      // // recordRefへの登録
      if (body.references.length > 0) {
        const createRecordRefsParams = { referenceTitle: "sample", referenceUrl: "sample", recordId: recordId };
        const links = body.references;
        // 暫定対応でfor文記載（後々bulkInsertにする:22/12/10）
        for (let info of links) {
          createRecordRefsParams.referenceTitle = info.referenceTitle;
          createRecordRefsParams.referenceUrl = info.referenceUrl;
          await prismaRecordRefsCreate(createRecordRefsParams);
        }
      }

      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString();
      const day = currentDate.getDate().toString();
      // 0埋めしてデータ登録
      const date = `${year}/${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
      const createRecordParams: any = {
        title: body.title,
        description: body.description,
        subject: body.subject,
        detail: body.detail,
        finished: body.finished,
        createdAtDate: date,
      };
      const record = await prismaRecordCreate(createRecordParams);

      // // idを返す
      res.setHeader("id", record.id);
      res.status(200).json({});
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

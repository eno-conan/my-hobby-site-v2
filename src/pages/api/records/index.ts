import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaRecordCreate, prismaRecordFindOneByTitle, prismaRecordsFindMany } from '../../../../prisma/functions/record';

/**
 * Next.js の API 定義
 * 
 * @param req リクエスト
 * @param res レスポンス
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { method, body, query } = req;

    switch (method) {
        case 'GET':
            let records;
            let info = { 'records': [], 'count': 0 }
            // 条件が入力されている場合は、絞って取得
            if (query.condition) {
                records = await prismaRecordFindOneByTitle(query.condition.toString());
            } else {
                // records = await prismaRecordsFindMany(Number(query.page));
                const [records, recordsCount] = await prismaRecordsFindMany(Number(query.page));
                info['records'] = records as any
                info['count'] = recordsCount as number
            }
            // 2022-12-11T03:32:18.117Z から2022/12/19に形式変更して返す
            // records.map((rcd) => {
            //     rcd.updatedAt = formatToTimeZone(rcd.updatedAt, FORMAT, { timeZone: TIME_ZONE_TOKYO }).split(' ')[0];
            // })
            res.status(200).json(info);
            break;

        case 'POST':
            if (!body) return res.status(400).end('No body');
            res.status(200).json({});
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
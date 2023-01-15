import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaRecordCreate, prismaRecordFindOneByTitle, prismaRecordsFindMany } from '../../../../prisma/functions/record';
import { prismaRecordRefsCreate } from '../../../../prisma/functions/recordRef';
// import { getDateInfo } from '../../../hooks/getDateInfo';
// import { formatToTimeZone } from 'date-fns-timezone';
// import { FORMAT, TIME_ZONE_TOKYO } from '../../../consts/setting';

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
            // // 条件が入力されている場合は、絞って取得
            // if (query.condition) {
            //     records = await prismaRecordFindOneByTitle(query.condition.toString());
            // } else {
            //     records = await prismaRecordsFindMany();
            // }
            // // 2022-12-11T03:32:18.117Z から2022/12/19に形式変更して返す
            // records.map((rcd) => {
            //     rcd.updatedAt = formatToTimeZone(rcd.updatedAt, FORMAT, { timeZone: TIME_ZONE_TOKYO }).split(' ')[0];
            // })
            // res.status(200).json(records);
            break;

        case 'POST':
            if (!body) return res.status(400).end('No body');
            const jsonBody = JSON.parse(body)
            // const params = JSON.parse(body) as Omit<Record, 'id'>;
            //recordテーブルへの登録内容設定 
            const cnt: number = (await prismaRecordsFindMany()).length + 1;

            // recordRefへの登録
            if (jsonBody.refs.length > 0) {
                const createRecordRefsParams = { referenceTitle: 'sample', referenceUrl: 'sample', recordId: cnt }
                const links = jsonBody.refs
                // 暫定対応でfor文記載（後々bulkInsertにする:22/12/10）
                for (let info of links) {
                    createRecordRefsParams.referenceTitle = info.referenceTitle
                    createRecordRefsParams.referenceUrl = info.referenceUrl
                    await prismaRecordRefsCreate(createRecordRefsParams);
                }
            }

            // const dateInfo = getDateInfo(2);
            const currentDate = new Date();
            const year = currentDate.getFullYear().toString();
            const month = (currentDate.getMonth() + 1).toString();
            const day = (currentDate.getDate()).toString();
            const date = year + '/' + month + '/' + day
            const createRecordParams: any = {
                title: jsonBody.title,
                description: jsonBody.description,
                subject: jsonBody.subject,
                detail: 'detail',
                finished: jsonBody.finished,
                createdAtDate: date
            }
            const record = await prismaRecordCreate(createRecordParams);

            // idを返す
            res.setHeader('id', record.id);
            res.status(200).json(record.id);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
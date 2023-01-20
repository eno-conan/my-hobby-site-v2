// Zodバリデーション適用
export interface IFieldCheckInputs {
    title: string;
    description: string;
    subject: string;
    references: Array<any>;
};

// データ追加用
export interface IRecord {
    title: string;
    description: string;
    subject: string;
    detail: string;
    finished: boolean;
    references: IRecordRef[];
}

interface IRecordRef {
    referenceTitle: string;
    referenceUrl: string;
}

// 一覧画面用
export interface IDisplayRecord {
    id: number;
    title: string;
    description: string;
    detail: string;
    finished: boolean;
    updatedAt: string;
}
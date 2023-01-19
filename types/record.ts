interface IRecordRef {
    referenceTitle: string;
    referenceUrl: string;
}

export interface IRecord {
    title: string;
    description: string;
    subject: string;
    detail: string;
    references: IRecordRef[]
}
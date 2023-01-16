interface ISubject {
    value: number;
    displayName: string;
}

// 学習単元
export const SUBJECTS: Array<ISubject> = [
    { value: 999, displayName: '学習分野を選択してください' },
    { value: 1, displayName: 'React' },
    { value: 2, displayName: 'Python' },
    { value: 3, displayName: 'AWS' },
    { value: 4, displayName: 'Azure' },
    { value: 5, displayName: 'DB' },
    { value: 0, displayName: 'その他' },
]
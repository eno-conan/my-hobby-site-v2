import { NextPage } from 'next'
import React, { useState } from 'react'
import { SubmitHandler, useFieldArray } from 'react-hook-form'
import { useLocale } from 'src/hooks/useLocale'
import { ErrorMessage } from '@hookform/error-message';
import Input from 'src/components/ui/Input'
import Select from 'src/components/ui/Select'
import NextLink from 'next/link'
import styles from "../../styles/pages/sample/rhfzod.module.css";
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import RecordForm from 'src/hooks/recordForm'
import Label from 'src/components/ui/Label';

// https://qiita.com/NozomuTsuruta/items/60d15d97eeef71993f06
type Inputs = {
    title: string;
    description: string;
    subject: string;
    references: Array<any>;
};

// 学習単元
const subjects = [
    { value: 999, displayName: '学習分野を選択してください' },
    { value: 0, displayName: '-(分類不可)' },
    { value: 1, displayName: 'React' },
    { value: 2, displayName: 'AWS' },
]

const Rhfzod: NextPage = () => {
    const { isJapanese } = useLocale();
    // フォーム情報取得
    const { control, register, handleSubmit, reset, formState: { errors } } = RecordForm();
    // 参照リンク
    const { fields, append, remove } = useFieldArray({ control, name: 'references' });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        alert(`${data.description} ${data.subject}`)
        // リンクの入力欄を初期状態に
        remove()
        // テキスト入力を初期化
        reset();
    };

    return (
        <div className={'container mx-auto px-8'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label type={'page'} word={'記録追加'} />
                <Label type={'subHeading'} word={'タイトル名'} />
                <Input register={register} label={'title'} classSub={'title'} />
                <ErrorMessage errors={errors} name="title" />

                <Label type={'subHeading'} word={'記録の概要'} />
                <Input register={register} label={'description'} classSub={'description'} />
                <ErrorMessage errors={errors} name="description" />

                <Label type={'subHeading'} word={'学習項目'} />
                <Select register={register} label={'subject'} data={subjects} />
                <ErrorMessage errors={errors} name="subject" />
                <div>
                    {fields.map((_field: any, index: number) => (
                        <div key={index}>
                            <Input register={register} label={`references.${index}.referenceTitle`} />
                            <ErrorMessage errors={errors} name={`references.${index}.referenceTitle`} />
                            <Input register={register} label={`references.${index}.referenceUrl`} />
                            <ErrorMessage errors={errors} name={`references.${index}.referenceUrl`} />
                            <button type={"button"} className={styles.IconButton} onClick={() => remove(index)}><Cross2Icon /></button>
                        </div>
                    ))}
                    {/* buttonタグはtype未設定の場合、submitで設定されてしまう */}
                    <button type={"button"} className={`${styles.IconButton} mt-2`}
                        onClick={() => append({ referenceTitle: '', referenceUrl: '' })}><PlusIcon /></button>
                </div>
                <div>
                    <button type={"submit"} className={`${styles.Button} ${styles.violet}`}>送信</button>
                </div>
            </form>
            <div className={'ml-4 font-bold'}>
                <h4>{isJapanese ? '国際化対応' : 'i18n'}</h4>
            </div>
            <NextLink href={'/sample/rhfzod'} locale={'ja'} passHref>
                <button className={`${styles.Button} ${styles.violet}`}>日本語</button>
            </NextLink>
            <NextLink href={'/sample/rhfzod'} locale={'en'} passHref>
                <button className={`${styles.Button} ${styles.violet}`}>英語</button>
            </NextLink>
        </div>
    )

}

export default Rhfzod

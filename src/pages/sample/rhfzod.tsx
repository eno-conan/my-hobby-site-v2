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
import Meta from '../components/Meta';
import * as Popover from '@radix-ui/react-popover';
import Router from "next/router";
import SwitchUI from 'src/components/ui/SwitchUI';

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
    { value: 1, displayName: 'React' },
    { value: 2, displayName: 'AWS' },
    { value: 3, displayName: 'DB' },
    { value: 0, displayName: '- (その他)' },
]

const Rhfzod: NextPage = () => {
    const { isJapanese } = useLocale();
    // フォーム情報取得
    const { control, register, handleSubmit, reset, getValues, formState: { errors } } = RecordForm();
    // 参照リンク
    const { fields, append, remove } = useFieldArray({ control, name: 'references' });
    const [finishStatus, setFinishStatus] = useState(false);
    // const [resStatus, setResStatus] = useState('')

    const onSubmit: SubmitHandler<Inputs> = async () => {
        // 送信情報の設定
        const newRecord = {
            title: getValues().title,
            description: getValues().description,
            subject: getValues().subject,
            detail: '',
            finished: finishStatus,
            refs: getValues().references
        };
        const method = 'POST';
        const body = JSON.stringify(newRecord);
        const headers = {
            'Accept': 'application/json'
        };
        const response = await fetch(`/api/record`, { method, headers, body });

        if (response.ok) {
            alert('登録完了')
            // リンクの入力欄を初期状態に
            remove()
            // // テキスト入力を初期化
            reset();
        } else {
            alert('何らかのエラーが発生')
        }
        Router.push({ pathname: `/`, });
        // Router.push({
        //     pathname: `/targetRecordPage/${maxId}`,
        //     query: {
        //         id: maxId,
        //         host: host,
        //         fromView: 'inputRecord'
        //     }
        // }, `/targetRecordPage/${maxId}`);
    };

    // if (!resStatus) {
    //     return (
    //         <>
    //             Loading...
    //         </>
    //     );
    // }

    return (
        <div className={'container mx-auto px-8'}>
            <Meta title="記録追加画面" description="レコード追加(更新)を行う画面" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label type={'page'} word={'記録追加'} />
                <Label type={'subHeading'} word={'タイトル名'} />
                <Input register={register} label={'title'} classSub={'title'} />
                {/* <textarea name="kansou"></textarea> */}
                <ErrorMessage errors={errors} name="title" />

                <Label type={'subHeading'} word={'記録の概要'} />
                <Input register={register} label={'description'} classSub={'description'} />
                <ErrorMessage errors={errors} name="description" />

                <Label type={'subHeading'} word={'学習項目'} />
                <Select register={register} label={'subject'} data={subjects} />
                <ErrorMessage errors={errors} name="subject" />
                <Label type={'subHeading'} word={'完了状態'} />
                <SwitchUI label={'完了ならチェック'} finishStatus={finishStatus} setFinishStatus={setFinishStatus} />
                <Label type={'subHeading'} word={'参考リンク（任意項目）'} />
                <Label type={'reference'} word={'ある場合は、＋ボタンをクリックして、左側に「見出し」、右側に「URL」を入力'} />
                {/* <Popover.Root>
                    <Popover.Trigger className={styles.PopoverTrigger} data-state={'open'}>?</Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content className={styles.PopoverContent} data-side={'right'} >
                            ある場合は、＋ボタンをクリックして、左側に「見出し」、右側に「URL」を入力
                            <Popover.Arrow className={styles.PopoverArrow} />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root> */}
                <div>
                    {fields.map((_field: any, index: number) => (
                        <div key={index}>
                            <Input register={register} label={`references.${index}.referenceTitle`} classSub={`referenceTitle`} />
                            <ErrorMessage errors={errors} name={`references.${index}.referenceTitle`} />
                            <Input register={register} label={`references.${index}.referenceUrl`} classSub={`referenceUrl`} />
                            <ErrorMessage errors={errors} name={`references.${index}.referenceUrl`} />
                            <button type={"button"} className={styles.IconButton} onClick={() => remove(index)}><Cross2Icon /></button>
                        </div>
                    ))}
                    {/* buttonタグはtype未設定の場合、submitで設定されてしまう */}
                    <button type={"button"} className={`${styles.IconButton} mt-2`}
                        onClick={() => append({ referenceTitle: '', referenceUrl: '' })} aria-label={"add input area about reference"}><PlusIcon /></button>
                </div>
                <div className={'text-right'}>
                    <button type={"submit"} className={`${styles.Button} ${styles.violet}`}>送信</button>
                </div>
            </form>
            {/* <div className={'ml-4 font-bold'}>
                <h4>{isJapanese ? '国際化対応' : 'i18n'}</h4>
            </div>
            <NextLink href={'/sample/rhfzod'} locale={'ja'} passHref>
                <button className={`${styles.Button} ${styles.violet}`}>日本語</button>
            </NextLink>
            <NextLink href={'/sample/rhfzod'} locale={'en'} passHref>
                <button className={`${styles.Button} ${styles.violet}`}>英語</button>
            </NextLink> */}
        </div >
    )

}

export default Rhfzod

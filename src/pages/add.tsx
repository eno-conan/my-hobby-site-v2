import { NextPage } from 'next'
import React, { useState } from 'react'
import styles from "../styles/pages/add.module.css";
import { SubmitHandler, useFieldArray } from 'react-hook-form'
import { useLocale } from 'src/hooks/useLocale'
import Input from 'src/components/ui/Input'
import Select from 'src/components/ui/Select'
import NextLink from 'next/link'
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons'
import RecordForm from 'src/hooks/recordForm'
import Label from 'src/components/ui/Label';
import * as Popover from '@radix-ui/react-popover';
import Router from "next/router";
import SwitchUI from 'src/components/ui/SwitchUI';
import TextArea from 'src/components/ui/TextArea';
import { SUBJECTS } from './api/record/consts';
import dynamic from "next/dynamic";
import Meta from 'src/components/Meta'
import { useMutation } from '@tanstack/react-query'
import wretch from 'wretch'
// 遅延読込
const ErrorMessageUI = dynamic(() => import('src/components/ui/ErrorMessageUI'));

// https://qiita.com/NozomuTsuruta/items/60d15d97eeef71993f06
type Inputs = {
    title: string;
    description: string;
    subject: string;
    references: Array<any>;
};

const Rhfzod: NextPage = () => {
    const { isJapanese } = useLocale();
    // フォーム情報取得
    const { control, register, handleSubmit, getValues, formState: { errors } } = RecordForm();
    // 参照リンク
    const { fields, append, remove } = useFieldArray({ control, name: 'references' });
    const [finishStatus, setFinishStatus] = useState(false);

    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const onSubmit: SubmitHandler<Inputs> = async () => {
        Router.push({ pathname: `/sending`, });
        await sleep(500);
        // 送信情報の設定
        const newRecord = {
            title: getValues().title,
            description: getValues().description,
            subject: getValues().subject,
            detail: getValues().detail,
            finished: finishStatus,
            refs: getValues().references
        };
        await wretch(`/api/record`).post(newRecord).res(response => {
            if (response.ok) {
                // リンクの入力欄を初期状態に
                // remove()
                // // テキスト入力を初期化
                // reset();
                Router.push({ pathname: `/`, });
            } else {
                alert('何らかのエラーが発生')
            }
        })
    };
    // この処理が呼び出されてない
    // const { isLoading, mutate } = useMutation(onSubmit, {
    //     onMutate: () => {
    //         console.log('onMutate');
    //     },
    //     onSuccess: () => {
    //         Router.push({ pathname: `/`, });
    //     },
    // });

    return (
        <div className={'container mx-auto px-8'}>
            <Meta title="記録追加画面" description="レコード追加(更新)を行う画面" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label type={'page'} word={'記録追加'} />
                {/* 主要項目 */}
                <Label type={'subHeading'} word={'タイトル名'} />
                <Input register={register} label={'title'} classSub={'title'} />
                <ErrorMessageUI errors={errors} name={'title'} />

                <Label type={'subHeading'} word={'記録の概要'} />
                <Input register={register} label={'description'} classSub={'description'} />
                <ErrorMessageUI errors={errors} name={'description'} />

                <Label type={'subHeading'} word={'学習項目'} />
                <Select register={register} label={'subject'} data={SUBJECTS} />
                <ErrorMessageUI errors={errors} name={'subject'} />
                <Label type={'subHeading'} word={'完了状態'} />
                <SwitchUI label={'finished'} finishStatus={finishStatus} setFinishStatus={setFinishStatus} />
                <ErrorMessageUI errors={errors} name={'finished'} />
                <Label type={'subHeading'} word={'詳細'} />
                <TextArea register={register} label={'detail'} />
                <ErrorMessageUI errors={errors} name={'detail'} />
                {/* 参考リンク */}
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
                            <Input register={register} label={`references.${index}.referenceUrl`} classSub={`referenceUrl`} />
                            <button type={"button"} className={styles.IconButton} onClick={() => remove(index)}><Cross2Icon /></button>
                            <ErrorMessageUI errors={errors} name={`references.${index}.referenceTitle`} />
                            <ErrorMessageUI errors={errors} name={`references.${index}.referenceUrl`} />
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
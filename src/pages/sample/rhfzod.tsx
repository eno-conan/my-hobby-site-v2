import { NextPage } from 'next'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm, SubmitHandler, get } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale } from 'src/hooks/useLocale'
import { ErrorMessage } from '@hookform/error-message';
import Input from 'src/components/ui/Input'
import NextLink from 'next/link'
import * as Select from '@radix-ui/react-select';
import styles from "../../styles/pages/sample/rhfzod.module.css";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

// https://qiita.com/NozomuTsuruta/items/60d15d97eeef71993f06
type Inputs = {
    name: string;
    email: string;
    subject: string;
};

const subjects = [
    { 'value': 999, name: '学習分野を選択' },
    { 'value': 1, name: 'React' },
    { 'value': 2, name: 'AWS' },
]

const EMAIL_FORMAT = new RegExp("^([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$");

const schema = z.object({
    name: z.string().min(2, "最低2文字は入力してください"),
    email: z.string().email("メールアドレスの形式が不正です").max(30, "最大30文字です")
        .regex(EMAIL_FORMAT, "メールアドレスの形式が不正です"),
    subject: z.string().max(2, 'いずれかの科目を選択してください')
})

const Rhfzod: NextPage = () => {
    const { control, register, handleSubmit, reset, getValues, formState: { errors } } = useForm<z.infer<typeof schema>>({
        mode: 'all',
        resolver: zodResolver(schema),
    })
    const { isJapanese } = useLocale();

    const SelectItem = React.forwardRef(({ children, ...props }: any, forwardedRef) => {
        return (
            <Select.Item className={styles.SelectItem} {...props} ref={forwardedRef}>
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className={styles.SelectItemIndicator}>
                    <CheckIcon />
                </Select.ItemIndicator>
            </Select.Item>
        );
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        alert(`${data.email} ${data.subject}`)
        reset();
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'my-2'}>
                    <Input register={register} label={'name'} />
                </div>
                <ErrorMessage errors={errors} name="name" />
                <div className={'my-2'}>
                    <Input register={register} label={'email'} />
                </div>
                <ErrorMessage errors={errors} name="email" />
                <div className='ml-4'>
                    <div>
                        <select className={styles.SelectTrigger} {...register("subject")}>
                            {subjects.map((subj) => {
                                return (
                                    <option className={styles.SelectItem} key={subj.value} value={subj.value}>
                                        {subj.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <ErrorMessage errors={errors} name="subject" />
                    {/* 一応残しておく */}
                    {/* <Select.Root>
                        <Select.Trigger className={styles.SelectTrigger} aria-label="Food">
                            <Select.Value defaultValue={"KOKO"} placeholder={"select"} />
                            <Select.Icon className={styles.SelectIcon}>
                                <ChevronDownIcon />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content className={styles.SelectContent}>
                                <Select.ScrollUpButton className={styles.SelectScrollButton}>
                                    <ChevronUpIcon />
                                </Select.ScrollUpButton>
                                <Select.Viewport className={styles.SelectViewport}>
                                    <Select.Group>
                                        {/* <Select.Label className={styles.SelectLabel}>Vegetables</Select.Label>
                                        <SelectItem value="aubergine">Aubergine</SelectItem>
                                        <SelectItem value="carrot">Carrot</SelectItem>
                                        <SelectItem value="abcd">ABCD</SelectItem>
                                    </Select.Group>
                                </Select.Viewport>
                                <Select.ScrollDownButton className={styles.SelectScrollButton}>
                                    <ChevronDownIcon />
                                </Select.ScrollDownButton>
                            </Select.Content>
                        </Select.Portal>
                    </Select.Root> */}
                </div>
                <div>
                    <button type="submit" className={`${styles.Button} ${styles.violet}`}>送信</button>
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

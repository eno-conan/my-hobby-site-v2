import { NextPage } from 'next'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale } from 'src/hooks/useLocale'
import { ErrorMessage } from '@hookform/error-message';
import Input from 'src/components/ui/Input'

// https://qiita.com/NozomuTsuruta/items/60d15d97eeef71993f06
type Inputs = {
    name: string;
    email: string;
};

const EMAIL_FORMAT = new RegExp("^([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$");

const schema = z.object({
    name: z.string().min(2, "最低2文字は入力してください"),
    email: z.string().email("メールアドレスの形式が不正です").max(30, "最大30文字です")
        .regex(EMAIL_FORMAT, "メールアドレスの形式が不正です"),
})

// transformっていうのもある
// const schema = z
//   .object({
//     lastName: z.string(),
//     firstName: z.string(),
//   })
//   .transform((arg) => {
//     return {
//       ...arg,
//       fullName: `${arg.lastName} ${arg.firstName}`,
//     };
//   });

const Rhfzod: NextPage = () => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof schema>>({
        mode: 'all',
        resolver: zodResolver(schema),
    })
    const { isJapanese } = useLocale()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'my-4'}>
                    <Input register={register} label={'name'} />
                </div>
                <ErrorMessage errors={errors} name="name" />
                <div className={'my-4'}>
                    <Input register={register} label={'email'} />
                </div>
                <ErrorMessage errors={errors} name="email" />
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Rhfzod

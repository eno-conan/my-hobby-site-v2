import { NextPage } from 'next'
import React, { useState } from 'react'
import { z } from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale } from 'src/hooks/useLocale'
import { ErrorMessage } from '@hookform/error-message';

// https://qiita.com/NozomuTsuruta/items/60d15d97eeef71993f06
type Inputs = {
    name: string;
    email: string;
};

const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
})

const Rhfzod: NextPage = () => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof schema>>({
        mode: 'all',
        resolver: zodResolver(schema),
    })
    const { isJapanese } = useLocale()
    // const [isLoading, setLoading] = useState(false)

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register('name')} />
                </div>
                <div className={'my-4'}>
                    <input
                        {...register('email', {
                            required: true,
                            maxLength: 60,
                            pattern: {
                                value:
                                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: 'メールアドレスの形式が不正です',
                            },
                        })}
                    />
                </div>
                <ErrorMessage errors={errors} name="name" />
                <ErrorMessage errors={errors} name="email" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Rhfzod

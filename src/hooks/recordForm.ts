import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

const referenceSchema = z.object({
    referenceTitle: z.string().max(200, '最大入力文字数(200)を超えています'),
    referenceUrl: z.string().max(200, '最大入力文字数(200)を超えています'),
})

const EMAIL_FORMAT = new RegExp("^([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$");

export const schema = z.object({
    name: z.string().min(2, "最低2文字は入力してください"),
    email: z.string().email("メールアドレスの形式が不正です").max(30, "最大30文字です")
        .regex(EMAIL_FORMAT, "メールアドレスの形式が不正です"),
    subject: z.string().max(2, 'いずれかの科目を選択してください'),
    references: z.array(referenceSchema).max(10)
})

const RecordForm = () => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof schema>>({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
    })
    return {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    }

}
export default RecordForm
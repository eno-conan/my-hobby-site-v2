import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

const referenceSchema = z.object({
    referenceTitle: z.string().max(200, '最大入力文字数(200)を超えています'),
    referenceUrl: z.string().max(200, '最大入力文字数(200)を超えています'),
})

export const schema = z.object({
    title: z.string().min(1, "最低1文字は入力してください").max(50, "最大50文字です"),
    description: z.string().min(1, "最低1文字は入力してください").max(100, "最大100文字です"),
    subject: z.string().max(2, 'いずれかの科目を選択してください'),
    references: z.array(referenceSchema).max(10)
})

const RecordForm = () => {
    const { control, register, handleSubmit, reset, getValues, formState: { errors } } = useForm<z.infer<typeof schema>>({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
    })
    return {
        control,
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    }

}
export default RecordForm
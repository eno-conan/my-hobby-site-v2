import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const referenceSchema = z.object({
  referenceTitle: z.string().max(100, "「見出し」が、最大文字数(100)を超えています"),
  referenceUrl: z.string().max(300, "「URL」が、最大文字数(300)を超えています"),
});

export const schema = z.object({
  title: z.string().min(1, "タイトル名は、最低1文字入力してください").max(50, "最大50文字です"),
  description: z.string().min(1, "概要は、最低1文字入力してください").max(100, "最大100文字です"),
  subject: z.string().max(2, "いずれかの科目を選択してください(決まっていない場合は、その他を選択してください)"),
  detail: z.string().max(1000, "最大1000文字です"),
  // 登録できる参照リンク数は10まで
  references: z.array(referenceSchema).max(10),
});

const RecordForm = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });
  return {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  };
};
export default RecordForm;

import React, { useState } from "react";
import styles from "../styles/pages/add.module.css";
import { SubmitHandler, useFieldArray } from "react-hook-form";
import Input from "src/components/ui/Input";
import Select from "src/components/ui/Select";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import RecordForm from "src/hooks/recordForm";
import Label from "src/components/ui/Label";
import Router from "next/router";
import SwitchUI from "src/components/ui/SwitchUI";
import TextArea from "src/components/ui/TextArea";
import { SUBJECTS } from "./api/record/consts";
import Meta from "src/components/Meta";
import wretch from "wretch";
import { NextPageWithLayout } from "./page";
import MainLayout from "src/components/layout";
import dynamic from "next/dynamic";
import { IFieldCheckInputs, IRecordForAdd } from "types/record";
// 遅延読込
const ErrorMessageUI = dynamic(
  () => import("src/components/ui/ErrorMessageUI")
);

// 一定時間処理停止
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// レコード情報送信
async function sendRecord(newRecord: any) {
  Router.push({ pathname: "/sending" });
  await sleep(500);
  // 送信情報の設定
  await wretch("/api/record")
    .post(newRecord)
    .res((response) => {
      if (response.ok) {
        Router.push({ pathname: "/" });
      } else {
        alert("何らかのエラーが発生");
      }
    });
}

const Add: NextPageWithLayout = () => {
  // フォーム情報取得
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = RecordForm();
  // 参照リンク
  const { fields, append, remove } = useFieldArray({
    control,
    name: "references",
  });
  const [finishStatus, setFinishStatus] = useState(false);

  const onSubmit: SubmitHandler<IFieldCheckInputs> = () => {
    // 送信情報設定
    const newRecord: IRecordForAdd = {
      title: getValues().title,
      description: getValues().description,
      subject: getValues().subject,
      detail: getValues().detail,
      finished: finishStatus,
      references: getValues().references,
    };
    // 送信
    sendRecord(newRecord);
  };
  // 記録テーブルへの登録情報
  function RecordArea() {
    return (
      <>
        {/* 主要項目 */}
        <Label type={"subHeading"} word={"タイトル名"} forValue={"title"} />
        <Input
          register={register}
          label={"title"}
          classSub={"title"}
          idValue={"title"}
        />
        <ErrorMessageUI errors={errors} name={"title"} />
        {/* 概要 */}
        <Label
          type={"subHeading"}
          word={"記録の概要"}
          forValue={"description"}
        />
        <Input
          register={register}
          label={"description"}
          classSub={"description"}
          idValue={"description"}
        />
        <ErrorMessageUI errors={errors} name={"description"} />
        {/* 科目 */}
        <Label type={"subHeading"} word={"学習項目"} />
        <Select register={register} label={"subject"} data={SUBJECTS} />
        <ErrorMessageUI errors={errors} name={"subject"} />
        {/* 詳細 */}
        <Label type={"subHeading"} word={"詳細"} />
        <TextArea register={register} label={"detail"} />
        <ErrorMessageUI errors={errors} name={"detail"} />
      </>
    );
  }
  // 参考リンクテーブルへの登録情報
  function ReferenceArea() {
    return (
      <>
        <Label type={"subHeading"} word={"参考リンク（任意項目）"} />
        <Label
          type={"reference"}
          word={"ある場合、＋ボタンをクリックして「見出し」「URL」の順に入力"}
        />
        <div>
          {fields.map((_field: any, index: number) => (
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation
            <div key={index}>
              <div className="flex">
                <Label type={"referenceIndex"} word={`${index + 1}個目`} />
                <button
                  type={"button"}
                  className={`${styles.IconButton}`}
                  onClick={() => remove(index)}
                >
                  <Cross2Icon />
                </button>
              </div>
              <Input
                register={register}
                label={`references.${index}.referenceTitle`}
                classSub={"referenceTitle"}
              />
              <Input
                register={register}
                label={`references.${index}.referenceUrl`}
                classSub={"referenceUrl"}
              />
              <ErrorMessageUI
                errors={errors}
                name={`references.${index}.referenceTitle`}
              />
              <ErrorMessageUI
                errors={errors}
                name={`references.${index}.referenceUrl`}
              />
            </div>
          ))}
          {/* buttonタグはtype未設定の場合、submitで設定されてしまう */}
          <button
            type={"button"}
            className={`${styles.IconButton} mt-2`}
            onClick={() => append({ referenceTitle: "", referenceUrl: "" })}
            aria-label={"add input area about reference"}
          >
            <PlusIcon />
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="container mx-auto items-center justify-between p-4">
      <Meta title="記録追加画面" description="レコード追加(更新)を行う画面" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label type={"page"} word={"記録追加"} />
        {/* 記録に関する入力 */}
        <RecordArea />
        {/* 完了状態 */}
        <Label type={"subHeading"} word={"完了状態"} />
        <SwitchUI
          label={"finished"}
          finishStatus={finishStatus}
          setFinishStatus={setFinishStatus}
        />
        <ErrorMessageUI errors={errors} name={"finished"} />
        {/* 参考リンク */}
        <ReferenceArea />
        <div className={"text-right"}>
          <button
            type={"submit"}
            className={`${styles.Button} ${styles.violet}`}
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;

Add.getLayout = (page) => <MainLayout>{page}</MainLayout>;

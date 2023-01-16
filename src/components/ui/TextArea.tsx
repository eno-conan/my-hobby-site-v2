import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import styles from "../../styles/components/textArea.module.css";

interface Props {
    register: UseFormRegister<any>;
    label: any;
    classSub?: string
}

const TextArea = ({ register, label, classSub = '' }: Props) => {
    return (
        <div>
            <textarea {...register(label)} maxLength={500} className={styles.TextArea} aria-label={"component ui for input detail content"} />
        </div>
    )
}

export default TextArea

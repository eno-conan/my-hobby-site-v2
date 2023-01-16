import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import styles from "../../styles/components/textArea.module.css";

interface Props {
    register: UseFormRegister<any>;
    label: any;
    classSub?: string
}

const TextArea = ({ register, label, classSub = '' }: Props) => {
    // このあたりいらないかも。
    // const [value, setValue] = useState<string>('')
    // const handleChange = (event: any) => {
    //     setValue(event.target.value);
    //     console.log(value)
    // }

    return (
        <div>
            {/* value={value} onChange={handleChange} */}
            <textarea {...register(label)} maxLength={500} className={styles.TextArea} />
        </div>
    )
}

export default TextArea

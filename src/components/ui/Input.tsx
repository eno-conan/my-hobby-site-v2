import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import styles from "../../styles/components/input.module.css";

interface Props {
    register: UseFormRegister<any>;
    label: any;
}

const Input = ({ register, label }: Props) => {
    return (
        <span>
            <input {...register(label)} className={styles.Input} />
        </span>
    )
}

export default Input

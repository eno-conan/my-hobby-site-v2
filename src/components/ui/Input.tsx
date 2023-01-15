import classnames from 'classnames/bind'; // <-- notice bind
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import styles from "../../styles/components/input.module.css";

interface Props {
    register: UseFormRegister<any>;
    label: any;
    classSub?: string
}

const cx = classnames.bind(styles);

const Input = ({ register, label, classSub = '' }: Props) => {
    return (
        <span>
            {/* 項目によって幅の調整可能 */}
            <input {...register(label)} className={cx('Input', classSub)} aria-label={"input type component ui"} />
        </span>
    )
}

export default Input

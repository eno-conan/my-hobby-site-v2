import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import styles from "../../styles/components/select.module.css";

interface Props {
    register: UseFormRegister<any>;
    label: any;
    data: any;
}

const Select = ({ register, label, data }: Props) => {
    return (
        <>
            <div>
                <select className={styles.SelectTrigger} {...register(label)}>
                    {data.map((subj: any) => {
                        return (
                            <option className={styles.SelectItem} key={subj.value} value={subj.value}>
                                {subj.displayName}
                            </option>
                        );
                    })}
                </select>
            </div>
        </>
    )
}

export default Select

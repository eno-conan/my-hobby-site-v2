import { ErrorMessage } from '@hookform/error-message'
import styles from "../../styles/components/errorMessage.module.css";
import React, { memo } from 'react'

interface Props {
    errors: any;
    name: any;
}

const ErrorMessageUI = ({ errors, name }: Props) => {
    return (
        <span className={`${styles.ErrorMessage} flex flex-nowrap`}>
            <ErrorMessage errors={errors} name={name} />
        </span>
    )
}

export default ErrorMessageUI;

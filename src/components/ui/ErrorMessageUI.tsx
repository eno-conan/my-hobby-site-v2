import { ErrorMessage } from '@hookform/error-message'
import styles from "../../styles/components/errorMessage.module.css";
import React from 'react'

interface Props {
    errors: any;
    name: any;
}

const ErrorMessageUI = ({ errors, name }: Props) => {
    return (
        <span className={styles.ErrorMessage}>
            <ErrorMessage errors={errors} name={name} />
        </span>
    )
}

export default ErrorMessageUI

import React from 'react'
import classnames from 'classnames/bind';
import styles from "../../styles/components/label.module.css";

interface Props {
    type: string;
    word: string;
}

const cx = classnames.bind(styles);

const Label = ({ type, word }: Props) => {

    return (
        <div className={cx('Label', type)}>{word}</div>
    )
}

export default Label
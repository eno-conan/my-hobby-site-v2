import React, { memo } from "react";
import classnames from "classnames/bind";
import styles from "../../styles/components/label.module.css";

interface Props {
  type: string;
  word: string;
  forValue?: string;
}

const cx = classnames.bind(styles);

const Label = ({ type, word, forValue }: Props) => {
  return (
    <label className="flex flex-nowrap" htmlFor={forValue}>
      <div className={cx("Label", type)}>{word}</div>
    </label>
  );
};

export default memo(Label);

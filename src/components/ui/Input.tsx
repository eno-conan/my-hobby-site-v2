import classnames from "classnames/bind";
import React, { memo } from "react";
import { UseFormRegister } from "react-hook-form";
import styles from "../../styles/components/input.module.css";

interface Props {
  register: UseFormRegister<any>;
  label: any;
  classSub?: string;
  idValue?: string;
}

const cx = classnames.bind(styles);

const Input = ({ register, label, classSub = "", idValue }: Props) => {
  return (
    <div>
      {/* 項目によって幅の調整可能 */}
      <span className="w-full">
        <input
          {...register(label)}
          className={`${cx("Input", classSub)} flex flex-nowrap`}
          aria-label={"input type component ui"}
          id={idValue}
        />
      </span>
    </div>
  );
};

export default memo(Input);

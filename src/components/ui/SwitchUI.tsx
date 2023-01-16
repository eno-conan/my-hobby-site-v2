import React from 'react'
import * as Switch from '@radix-ui/react-switch';
import styles from "../../styles/components/switch.module.css";
import Label from './Label';

interface Props {
    label: string
    finishStatus: boolean;
    setFinishStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwitchUI = ({ label, finishStatus, setFinishStatus }: Props) => {

    const ChangeStatus = () => {
        finishStatus ? setFinishStatus(false) : setFinishStatus(true)
    }

    return (
        <div className={"flex"}>
            <Switch.Root className={styles.SwitchRoot} aria-label={"button which is switch finish status"} onClick={ChangeStatus}>
                <Switch.Thumb className={styles.SwitchThumb} />
            </Switch.Root>
            <Label type={'finishStatus'} word={label} />
        </div>
    )
}

export default SwitchUI

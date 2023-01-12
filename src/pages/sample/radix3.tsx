import React from 'react'
import * as Toast from '@radix-ui/react-toast';
import styles from "../../styles/pages/sample/radix3.module.css";

const Radix3 = () => {
    const [open, setOpen] = React.useState(false);
    const eventDateRef = React.useRef(new Date());
    const timerRef = React.useRef(0);

    React.useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    return (
        <Toast.Provider swipeDirection="right">
            <button
                className={`${styles.Button} ${styles.large} ${styles.violet}`}
                onClick={() => {
                    setOpen(false);
                    window.clearTimeout(timerRef.current);
                    timerRef.current = window.setTimeout(() => {
                        eventDateRef.current = oneWeekAway();
                        setOpen(true);
                    }, 100);
                }}
            >
                Add to calendar
            </button>

            <Toast.Root className={styles.ToastRoot} open={open} onOpenChange={setOpen}>
                <Toast.Title className={styles.ToastTitle}>Scheduled: Catch up</Toast.Title>
                <Toast.Description asChild>
                    <time className={styles.ToastDescription} dateTime={eventDateRef.current.toISOString()}>
                        {prettyDate(eventDateRef.current)}
                    </time>
                </Toast.Description>
                <Toast.Action className={styles.ToastAction} asChild altText="Goto schedule to undo">
                    <button className={`${styles.Button} ${styles.small} ${styles.green}`}>Undo</button>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className={styles.ToastViewport} />
        </Toast.Provider>
    );
};

function oneWeekAway(date?: any) {
    const now = new Date();
    const inOneWeek = now.setDate(now.getDate() + 7);
    return new Date(inOneWeek);
}

function prettyDate(date?: any) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export default Radix3

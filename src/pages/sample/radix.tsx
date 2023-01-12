import * as Label from '@radix-ui/react-label';
import * as Popover from '@radix-ui/react-popover';
import React from 'react';
import styles from "../../styles/pages/sample/radix.module.css";

const RadixIndex = () => {
    return (
        <>
            <div className='container mx-auto py-2'>
                <div className={styles.TopicLabel}>
                    <h4>Label</h4>
                </div>
                <div>
                    <Label.Root className={styles.LabelRoot} htmlFor="firstName">
                        First name
                    </Label.Root>
                </div>
                <div className={styles.TopicLabel}>
                    <h4>Popover</h4>
                </div>
                <div>
                    <Popover.Root>
                        <Popover.Trigger className={styles.PopoverTrigger}>More info</Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content className={styles.PopoverContent} sideOffset={5}>
                                Some more info…
                                <Popover.Arrow className={styles.PopoverArrow} />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </div>
            </div>
        </>
    );
}

export default RadixIndex

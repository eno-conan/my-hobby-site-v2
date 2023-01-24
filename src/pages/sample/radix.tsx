import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import React from "react";
import styles from "../../styles/pages/sample/radix.module.css";
import Headline from "../../components/Headline";

const RadixIndex = () => {
  return (
    <>
      <div className='container mx-auto py-2'>
        <Headline headline='Radix Sample Page' />
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
        <div className={styles.TopicLabel}>
          <h4>Title</h4>
          <input className={styles.InputSample} type="text" id="firstName" defaultValue="" />
        </div>
        <div className={styles.TopicLabel}>
          <h4>Description</h4>
          <input className={styles.InputSample} type="text" id="firstName" defaultValue="" />
        </div>
        <div className={styles.TopicLabel}>
          <h4>Detail</h4>
          <input className={styles.InputSample} type="text" id="firstName" defaultValue="" />
        </div>
        <div className={styles.TopicLabel}>
          <h4>Dialog</h4>
        </div>
        <div>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className={`${styles.Button} ${styles.violet}`}>Edit profile</button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className={styles.DialogOverlay} />
              <Dialog.Content className={styles.DialogContent}>
                <Dialog.Title className={styles.DialogTitle}>Edit profile</Dialog.Title>
                <Dialog.Description className={styles.DialogDescription}>
                  Make changes to your profile here. Click save when you're done.
                </Dialog.Description>
                <fieldset className={styles.Fieldset}>
                  <label className={styles.Label} htmlFor="name">
                    Name
                  </label>
                  <input className={styles.Input} id="name" placeholder='Mike' />
                </fieldset>
                <fieldset className={styles.Fieldset}>
                  <label className={styles.Label} htmlFor="username">
                    Username
                  </label>
                  <input className={styles.Input} id="username" placeholder='@Mike' />
                </fieldset>
                <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
                  <Dialog.Close asChild>
                    <button className={`${styles.Button} ${styles.green}`}>Save changes</button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button className={styles.IconButton} aria-label="Close">
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </>
  );
};

export default RadixIndex;

import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from '@radix-ui/react-icons';
import styles from "../../styles/pages/sample/radix2.module.css";

const Radix2 = () => {
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [person, setPerson] = React.useState('pedro');

    const reverseBookmarksChecked = () => {
        if (bookmarksChecked) {
            setBookmarksChecked(false)
        } else {
            setBookmarksChecked(true)
        }
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className={styles.IconButton} aria-label="Customise options">
                    <HamburgerMenuIcon />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className={styles.DropdownMenuContent} sideOffset={5}>
                    <DropdownMenu.Item className={styles.DropdownMenuItem}>
                        New Window <div className={styles.RightSlot}>⌘+N</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger className={styles.DropdownMenuSubTrigger}>
                            More Tools
                            <div className={styles.RightSlot}>
                                <ChevronRightIcon />
                            </div>
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.Portal>
                            <DropdownMenu.SubContent
                                className={styles.DropdownMenuSubContent}
                                sideOffset={2}
                                alignOffset={-5}
                            >
                                <DropdownMenu.Item className={styles.DropdownMenuItem}>
                                    Save Page As… <div className={styles.RightSlot}>⌘+S</div>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className={styles.DropdownMenuItem}>Create Shortcut…</DropdownMenu.Item>
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

                    <DropdownMenu.CheckboxItem
                        className={styles.DropdownMenuCheckboxItem}
                        checked={bookmarksChecked}
                        onCheckedChange={reverseBookmarksChecked}
                    >
                        <DropdownMenu.ItemIndicator className={styles.DropdownMenuItemIndicator}>
                            <CheckIcon />
                        </DropdownMenu.ItemIndicator>
                        Show Bookmarks <div className={styles.RightSlot}>⌘+B</div>
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />

                    {/* <DropdownMenu.Label className={styles.DropdownMenuLabel}>People</DropdownMenu.Label>
                    <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
                        <DropdownMenu.RadioItem className={styles.DropdownMenuRadioItem} value="pedro">
                            <DropdownMenu.ItemIndicator className={styles.DropdownMenuItemIndicator}>
                                <DotFilledIcon />
                            </DropdownMenu.ItemIndicator>
                            Pedro Duarte
                        </DropdownMenu.RadioItem>
                        <DropdownMenu.RadioItem className={styles.DropdownMenuRadioItem} value="colm">
                            <DropdownMenu.ItemIndicator className={styles.DropdownMenuItemIndicator}>
                                <DotFilledIcon />
                            </DropdownMenu.ItemIndicator>
                            Colm Tuite
                        </DropdownMenu.RadioItem>
                    </DropdownMenu.RadioGroup> */}

                    <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

export default Radix2

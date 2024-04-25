'use client'

import { useRef, useEffect, ReactNode, memo } from 'react'
import cls from './Dialog.module.css'
import Image from 'next/image'

type Props = {
    onOpenToggle: () => void
    isOpen: boolean
    children: ReactNode
    isModal?: boolean
    closeAnyTouch?: boolean
}

// eslint-disable-next-line react/display-name
export const Dialog = memo(
    ({
        onOpenToggle,
        isModal,
        isOpen,
        closeAnyTouch = false,
        children,
    }: Props) => {
        const dialogRef = useRef<null | HTMLDialogElement>(null)

        useEffect(() => {
            if (isOpen) {
                isModal
                    ? dialogRef.current?.showModal()
                    : dialogRef.current?.show()
            } else {
                dialogRef.current?.close()
            }
        }, [isOpen, isModal])

        const closeDialog = () => {
            dialogRef.current?.close()

            onOpenToggle()
        }

        return (
            <dialog
                ref={dialogRef}
                className={cls.dialog}
                onClick={closeAnyTouch ? closeDialog : undefined}
            >
                <div className={cls.dialogWrapper}>
                    <div className={cls.buttonContainer}>
                        <button onClick={closeDialog} className={cls.closeBtn}>
                            <Image
                                src={'/img/close-small.svg'}
                                alt={'close button'}
                                height={20}
                                width={20}
                            />
                        </button>
                    </div>
                    <div className={cls.contentWrapper}>{children}</div>
                </div>
            </dialog>
        )
    },
)

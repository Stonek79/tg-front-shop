import React from 'react'
import Image from 'next/image'
import cls from './ImageDialogComponent.module.css'

interface ImageDialogProps {
    imageSrc: string | null
}

export const ImageDialogComponent = ({ imageSrc }: ImageDialogProps) => (
    <dialog
        id={'myDialog'}
        className={cls.dialog}
        aria-labelledby="image-dialog"
    >
        {imageSrc && (
            <img
                id="image-dialog"
                alt={'Product image'}
                src={imageSrc}
                className={cls.imageItem}
            />
        )}
    </dialog>
)

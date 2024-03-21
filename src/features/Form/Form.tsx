'use client'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import './Form.module.css'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'

export const Form = () => {
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [subject, setSubject] = useState('physical')
    const tg = useWebApp()

    const onSendData = useCallback(() => {
        const data = {
            city,
            address,
            subject,
        }
        tg.sendData(JSON.stringify(data))
    }, [tg, city, address, subject])

    useEffect(() => {
        if (tg?.platform !== 'unknown') {
            tg.onEvent('mainButtonClicked', onSendData)

            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            }
        }
    }, [tg, onSendData])

    useEffect(() => {
        if (tg?.platform !== 'unknown') {
            tg.MainButton.setParams({
                text: 'Отправить данные',
            })
        }
    }, [tg])

    useEffect(() => {
        if (tg?.platform === 'unknown') {
            return
        }

        if (!city || !address) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [tg, city, address])

    const onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value)
    }

    const onChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }

    const onChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSubject(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Город'}
                value={city}
                onChange={onChangeCity}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Адрес доставки'}
                value={address}
                onChange={onChangeAddress}
            />
            <select
                value={subject}
                onChange={onChangeSubject}
                className={'select'}
            >
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    )
}

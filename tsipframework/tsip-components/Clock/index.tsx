'use client'

import React, { useEffect, useState } from 'react';
import moment from 'moment';

// Styles
import './styles/index.local.scss';

interface Props {
    className?: string
 };

export default function Clock(props: Props) {
    const {className = ''} = props;
    const [timer, setTimer] = useState(moment().format('HH:mm:ss'));

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer(moment().format('HH:mm:ss'))
        }, 1000);
        return () => clearInterval(timerInterval);
    }, [])

    return (
        <span className={`t-sip-components-clock ${className}`}>
            {timer}
        </span>
    );
}

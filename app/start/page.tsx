'use client'
import { Spin } from 'antd';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation'

// Selectors
import { getToken } from '@/tsipframework/tsip-module-auths/selectors/authSelector'

function Start() {
    const token = useSelector(getToken);
    const router = useRouter()

    useEffect(() => {
        if (token) {
            router.push('/home', { scroll: false })
        } else {
            router.push('/login', { scroll: false })
        }
    }, [token])

    return (
        <div className="example">
            <Spin />
        </div>
    );
}

export default Start;
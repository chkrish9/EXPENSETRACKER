import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import usePersist from "../hooks/usePersist";
import { useGlobalContext } from "../context/globalContext";
import { Messages } from 'primereact/messages';
import { useMountEffect } from 'primereact/hooks';

const PersistLogin = () => {

    const [persist] = usePersist()
    const { token } = useGlobalContext();
    const effectRan = useRef(false)
    const msgs = useRef(null);

    const [trueSuccess, setTrueSuccess] = useState(false)

    const { refresh, setToken } = useGlobalContext();

    useEffect(() => {

        if (effectRan.current === true) { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    const response = await refresh()
                    if (!response) {
                        return;
                    }
                    const { accessToken } = response.data;
                    setToken(accessToken);
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }

            if (!token) verifyRefreshToken();
        }

        return () => effectRan.current = true
    }, [])

    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'error', summary: 'Error', detail: 'Some thing went wrong. Please login again', closable: false }
            ]);
        }
    });


    let content
    if (!persist && token) { // persist: no
        content = <Outlet />
    } else if (trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token) { //persist: yes, token: yes
        console.log('token and uninit')
        content = <Outlet />
    } else {
        content = (
            <>
                <Messages ref={msgs} />
                <Link to="/login">Login</Link>
            </>
        )
    }

    return content
}
export default PersistLogin
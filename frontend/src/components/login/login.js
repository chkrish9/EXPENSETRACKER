import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import logo from '../../img/logo.png';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { useGlobalContext } from '../../context/globalContext';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom'


export const Login = () => {
    const [loginUser, setLoginUser] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    const toast = useRef(null);

    const { setUser, login, setToken } = useGlobalContext();

    const onLogin = async () => {
        if (!loginUser.username || !loginUser.password) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please enter Username and Password', life: 3000 });
            return;
        }
        try {
            const response = await login(loginUser);
            setToken(response.data.accessToken);
            localStorage.setItem("username", loginUser.username)
            setUser(loginUser.username);
            setLoginUser({
                username: '',
                password: ''
            })
            navigate('/dashboard')
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Wrong Username or Password', life: 3000 });
        }
    }
    return (
        <>
            <div className="flex h-full flex-column justify-content-center align-items-center">
                <div className="col-10 lg:col-6 xl:col-3">
                    <div className="card">
                        <Card>
                            <div className='flex flex-column align-items-center'>
                                <h1>Expense Tracker</h1>
                                <img alt="logo" src={logo} height="100" width="100" />
                                <div className="w-full">
                                    <FloatLabel className="my-4">
                                        <InputText id="username" className="w-full" value={loginUser.username} onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })} />
                                        <label htmlFor="username">Username</label>
                                    </FloatLabel>
                                </div>
                                <div className="w-full">
                                    <FloatLabel className="my-4">
                                        <Password inputId="password" feedback={false} className="w-full password-field" toggleMask value={loginUser.password} onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} />
                                        <label htmlFor="password">Password</label>
                                    </FloatLabel>
                                </div>
                                <Button label="Login" onClick={onLogin} />
                                <Toast ref={toast} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import logo from '../../img/logo.png';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { useGlobalContext } from '../../context/globalContext';


export const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const { setIsLoggedIn, getUsername, getPassword } = useGlobalContext();

    const onLogin = () => {
        if (user.username === getUsername() && user.password === getPassword()) {
            setIsLoggedIn(true);
        }
    }
    return (
        <>
            <div className="grid h-full flex-column justify-content-center align-content-center">
                <div className="col-3">
                    <div className="card">
                        <Card title="Login">
                            <div className='flex flex-column align-items-center'>
                                <img alt="logo" src={logo} height="100" width="100" />
                                <div className="w-full">
                                    <FloatLabel className="my-4">
                                        <InputText id="username" className="w-full" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                        <label htmlFor="username">Username</label>
                                    </FloatLabel>
                                </div>
                                <div className="w-full">
                                    <FloatLabel className="my-4">
                                        <Password inputId="password" feedback={false} className="w-full password-field" toggleMask value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                        <label htmlFor="password">Password</label>
                                    </FloatLabel>
                                </div>
                                <Button label="Login" onClick={onLogin} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
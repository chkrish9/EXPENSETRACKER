import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import logo from '../../img/logo.png';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';
import { useGlobalContext } from '../../context/globalContext';
import { Toast } from 'primereact/toast';


export const Login = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const toast = useRef(null);

    const { setIsLoggedIn, getUsername, getPassword } = useGlobalContext();

    const onLogin = () => {
        if(!user.username || !user.password){
            toast.current.show({severity:'error', summary: 'Error', detail:'Please enter Username and Password', life: 3000});
            return;
        }
        if (user.username === getUsername() && user.password === getPassword()) {
            setIsLoggedIn(true);
        }else{
            toast.current.show({severity:'error', summary: 'Error', detail:'Wrong Username or Password', life: 3000});
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
                                <Toast ref={toast} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
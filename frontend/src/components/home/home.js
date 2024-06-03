import { Outlet } from 'react-router-dom'
import { getMenuItems } from '../../utils/utilites';
import { useGlobalContext } from "../../context/globalContext";
import { useState } from "react";


import { Menubar } from 'primereact/menubar';
import { Tag } from 'primereact/tag';

import Navigation from "../navigation/navigation";
import logo from '../../img/logo.png';

export const Home = () => {
    const [active, setActive] = useState(1);
    const { logout } = useGlobalContext();

    const start = (
        <div className="flex flex-row align-items-center">
            <img alt="logo" src={logo} height="40" className="mr-2" />
            <Tag severity="info" value={getMenuItems().find(item => item.id === active).title}></Tag>
        </div>
    );

    const end = (
        <div className="flex flex-row align-items-center">
            <span onClick={logout}><i className="pi pi-sign-out mr-1 text-1xl cursor-pointer"></i></span>
        </div>
    )
    return (
        <div className="main-app flex flex-column align-items-stretch">
            <div className="flex-grow-1 flex-shrink-0 mb-7">
                <div className="card">
                    <Menubar start={start} end={end} />
                </div>
                <div className="mx-2"><Outlet /></div>
            </div>
            <div className="flex-shrink-0 footer">
                <Navigation active={active} setActive={setActive} />
            </div>
        </div>
    )
}
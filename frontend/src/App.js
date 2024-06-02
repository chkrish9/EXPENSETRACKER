import Navigation from "./components/navigation/navigation";
import { useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Income from "./components/income/income";
import Expense from "./components/expense/expense";
import logo from './img/logo.png';
import { Menubar } from 'primereact/menubar';
import { Tag } from 'primereact/tag';
import { getMenuItems } from './utils/utilites';
import { Login } from './components/login/login'
import { useGlobalContext } from "./context/globalContext";
function App() {
  const [active, setActive] = useState(1);
  const { isLoggedIn } = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Income />;
      case 3:
        return <Expense />;
      default:
        return <Dashboard />;
    }
  };
  const start = (
    <div className="flex flex-row align-items-center">
      <img alt="logo" src={logo} height="40" className="mr-2" />
      <Tag severity="info" value={getMenuItems().find(item => item.id === active).title}></Tag>
    </div>
  );
  return (
    <>
      {
        isLoggedIn ? (<div className="main-app flex flex-column align-items-stretch">
          <div className="flex-grow-1 flex-shrink-0 mb-7">
            <div className="card">
              <Menubar start={start} />
            </div>
            <div className="mx-2">{displayData()}</div>
          </div>
          <div className="flex-shrink-0 footer">
            <Navigation active={active} setActive={setActive} />
          </div>
        </div>) : (<Login />)
      }

    </>

  );
}

export default App;

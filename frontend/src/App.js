import Navigation from "./components/navigation/navigation";
import { useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Income from "./components/income/income";
import Expense from "./components/expense/expense";
import logo from './img/logo.png';
import { Menubar } from 'primereact/menubar';
import { Tag } from 'primereact/tag';
let pageName = 'Dashboard';
function App() {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        pageName = "Dashboard";
        return <Dashboard />;
      case 2:
        pageName = "Income";
        return <Income />;
      case 3:
        pageName = "Expense";
        return <Expense />;
      default:
        pageName = "Dashboard";
        return <Dashboard />;
    }
  };
  const start = (
    <div className="flex flex-row align-items-center">
      <img alt="logo" src={logo} height="40" className="mr-2"/>
      <Tag severity="info" value={pageName}></Tag>
    </div>
  );
  return (
    <div className="main-app flex flex-column align-items-stretch">
      <div className="flex-grow-1 flex-shrink-0 mb-7">
        <div className="card">
          <Menubar start={start} />
        </div>
        <div className="mx-2">{displayData()}</div>
      </div>
      <div className="flex-shrink-0 footer">
        <Navigation active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default App;

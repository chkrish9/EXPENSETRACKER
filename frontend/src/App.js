import Navigation from "./components/navigation/navigation";
import { useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Income from "./components/income/income";
import Expense from "./components/expense/expense";

function App() {
  const [active, setActive] = useState(1);

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
  return (
    <div className="main-app flex flex-column align-items-stretch">
      <div className="flex-grow-1 flex-shrink-0 mb-7">
        <div>{displayData()}</div>
      </div>
      <div className="flex-shrink-0 footer">
        <Navigation active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default App;

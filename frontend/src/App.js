
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./components/dashboard/dashboard";
import Income from "./components/income/income";
import Expense from "./components/expense/expense";
import PersistLogin from "./auth/persistLogin";
import { Login } from './components/login/login';
import { Home } from './components/home/home';

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<Home />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="incomes" element={<Income />} />
            <Route path="expenses" element={<Expense />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

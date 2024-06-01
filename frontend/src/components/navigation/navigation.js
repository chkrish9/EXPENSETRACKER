import { TabMenu } from 'primereact/tabmenu';
import {dashboard, expenses, trend} from '../../utils/icons'

function Navigation({ active, setActive }) {
    const itemRenderer = (item) => (
        <span className="p-menuitem-link flex align-items-center gap-2" onClick={() => setActive(item.id)}>
            <span className="font-bold">{item.icon}</span>
        </span>
    );
    const menuItems = [
        {
            id: 1,
            title: 'Dashboard',
            icon: dashboard,
            link: '/dashboard',
            template: (item) => itemRenderer(item)
        },
        {
            id: 2,
            title: "Incomes",
            icon: trend,
            link: "/dashboard",
            template: (item) => itemRenderer(item)
        },
        {
            id: 3,
            title: "Expenses",
            icon: expenses,
            link: "/dashboard",
            template: (item) => itemRenderer(item)
        },
    ]
    
    return (
        <div className="flex align-items-center justify-content-center fixed bottom-0 w-full">
            <TabMenu model={menuItems} activeIndex={active - 1 } onTabChange={(e) => setActive(e.id)} />
        </div>
    )
}

export default Navigation
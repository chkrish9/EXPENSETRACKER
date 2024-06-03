import { TabMenu } from 'primereact/tabmenu';
import { getMenuItems } from '../../utils/utilites';
import { Link } from "react-router-dom"

function Navigation({ active, setActive }) {
    const itemRenderer = (item) => (
        <Link className="p-menuitem-link flex align-items-center gap-2" to={item.link} onClick={() => setActive(item.id)}>
            <span className="font-bold">{item.icon}</span>
        </Link>
    );
    const menuItems = getMenuItems().map((item)=>{
        item.template = (item) => itemRenderer(item);
        return item;
    });
    
    return (
        <div className="flex fixed bottom-0 w-full">
            <TabMenu model={menuItems} activeIndex={active - 1 } onTabChange={(e) => setActive(e.id)} />
        </div>
    )
}

export default Navigation
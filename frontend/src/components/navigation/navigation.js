import { TabMenu } from 'primereact/tabmenu';
import { getMenuItems } from '../../utils/utilites';

function Navigation({ active, setActive }) {
    const itemRenderer = (item) => (
        <span className="p-menuitem-link flex align-items-center gap-2" onClick={() => setActive(item.id)}>
            <span className="font-bold">{item.icon}</span>
        </span>
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
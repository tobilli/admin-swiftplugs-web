import React from 'react'
import languages from '../../../languages/languages';
import logoutIcon from "../../../../images/LogOutIcon.png";
import "../styles/sideBar.scss";
import logOut from '../../../session/logOut';
import swiftPlugsLogo from "../../../../images/SwiftPlugIcon.png";
import homeIcon from "../../../../images/HomeIcon.png";
import { DASHBOARD } from '../../../../RouteConstants';
import { NavLink } from 'react-router-dom';


const SideBar=({setLogout})=> {
    const langs = languages('navigationBar');
    
  
    const navlist=[
      {
        name: `${langs.home}`,
        path: `${DASHBOARD.HOME}`,
        icon: homeIcon,
    },
    {
        name: `${langs.categories}`,
        path: `${DASHBOARD.CATEGORIES}`,
           icon: homeIcon,
    },
    {
        name: `${langs.products}`,
        path: `${DASHBOARD.PRODUCTS}`,
           icon: homeIcon,
    },
    {
        name: `${langs.orders}`,
        path: `${DASHBOARD.ORDERS}`,
           icon: homeIcon,
    },
    {
        name: `${langs.customers}`,
        path: `${DASHBOARD.CUSTOMERS}`,
           icon: homeIcon,
    },
    ]
    // const logout=()=>{
    //   logOut()
    // }
  return (
    <aside className="sidebar">
    <div className="sidebar__layout">
      <div className="sidebar__logo">
      <img src={swiftPlugsLogo} alt="swiftPlugsLogo" width={200} height={100} />
      </div>
      <div className="sidebar__menuItems">
        {navlist.map((list) => (
          <NavLink
            key={list.name}
             to={list.path}
             exact={list.path}
             end
            className={({isActive })  =>
              `siderbar__itemLinks 
              ${isActive  && "active"} ` 
            }
          
          >
            {/* <img
              src={list.icon}
              alt={list.name}
              width="18px"
              className="sidebar__menuItem__icon"
            /> */}
            <div className="sidebar__menuItem__title">
              <div>{list.name}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>

    <div
      className="mobile__menuItem__logout"
      onClick={() => logOut()}        
      style={{ bottom: 50 }}
    >
      <div className="menuItem__title">{langs.logOut}</div>
    </div>
  </aside>
  )
}

export default SideBar
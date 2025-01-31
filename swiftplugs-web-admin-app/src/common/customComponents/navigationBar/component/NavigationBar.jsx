import React, { useState } from 'react'
import languages from '../../../languages/languages'
import menuToggle from "../../../../images/menu-list.svg";
import "../styles/navigationBar.scss";
import signoutIcon from "../../../../images/LogOutIcon.png"
import swiftPlugsLogo from "../../../../images/SwiftPlugIcon.png";
import homeIcon from "../../../../images/HomeIcon.png";
import { DASHBOARD } from '../../../../RouteConstants';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentFirstName } from '../../../../features/userAccount/slices/loginSlice';


const NavigationBar = () => {
  const langs = languages('navigationBar');
  const [visibileOnMobile, setVisibleOnMobile] = useState(false);
  const route = useLocation()
  const firstName = useSelector(selectCurrentFirstName )

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

  const showPath=(route)=>{
    let navPage = route.pathname;
    switch(navPage){
      case DASHBOARD.HOME:
        return langs.home;
      case DASHBOARD.CATEGORIES:
        return langs.categories;
      case DASHBOARD.PRODUCTS:
        return langs.products;
      case DASHBOARD.ORDERS:
        return langs.orders;
      case DASHBOARD.CUSTOMERS:
        return langs.customers;
        default:
          langs.home

    }
  }


  const onToggleMenu = () => {
    setVisibleOnMobile(true);
  };

  return (
    <nav className="navbar">
    <div onClick={onToggleMenu} className="navbar__toggle__menu">
      <img
        src={menuToggle}
        alt="toggle-menu"
      />
    </div>
    <div className="navbar__items">
     <div className='navbar__items__path'>
      <h3 style={{color: "black"}}>{showPath(route)}</h3>
     </div>
    </div>

    <div
      className={`mobile__view ${visibileOnMobile && "mobile__overlay"}`}
      // onClick={() => setVisibleOnMobile(false)}
    >
      <div
        className={`${
          visibileOnMobile ? "show__on__toggle" : "hide__on__toggle"
        }`}
      >
        <div className="mobile__display">
        <div className="navbar__items__logo">
      <img src={swiftPlugsLogo} alt="swiftPlugsLogo" width={40} height={40} />
      </div>
          <div className="mobile__menuItems">
            {navlist.map((list, index) => (
              <NavLink
                key={index}
                to={list.path}
                exact={list.path}
                end
                className={({ isActive }) =>
                  `mobile__itemLinks ${isActive && "active"}`
                }
              >
                <div className="mobile__menuItem__title">{list.name}</div>
              </NavLink>
            ))}
          </div>
        </div>
       
    <div
      className="mobile__menuItem__logout"
      // onClick={() => logout()}        
      style={{ bottom: 50 }}
    >
      <img
        src={signoutIcon}
        alt="logout"
        width="18px"
        className="sidebar__menuItem__icon"
      />
      <div className="menuItem__title">{langs.logOut}</div>
    </div>
      </div>
    </div>
  </nav>
  )
}

export default NavigationBar
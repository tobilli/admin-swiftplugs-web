import React, { useCallback, useState } from 'react'
import NavigationBar from '../../../common/customComponents/navigationBar/component/NavigationBar'
import { Outlet } from 'react-router-dom';
import "../styles/dashboardLayout.scss";
import languages from '../../../common/languages/languages';
import SideBar from '../../../common/customComponents/sideComponent/component/SideBar';



const DashboardLayout = () => {
  const [logout, setLogout] = useState(false);
  const onCloseModal = useCallback(() => {
    setLogout(false);
  }, [])


  return (
    <div className="dashboardLayout__container">
    <SideBar languages={languages} setLogout={setLogout} />
    <div className="main__section__page">
      <NavigationBar languages={languages} setLogout={setLogout} />
      <main className="layout__main__area">
        {/* {logout && (
          <Modal
            size="mini"
            style={{ width: "440px", height: "278px", paddingBlock: "0rem" }}
            closeIcon
            open={logout}
            onClose={onCloseModal}
          >
            <SignOutModals languages={languages} setLogout={setLogout} />
          </Modal>
        )} */}
        <Outlet />
      </main>
    </div>
  </div>
  )
}

export default DashboardLayout
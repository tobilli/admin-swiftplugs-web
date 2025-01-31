import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AUTH, DASHBOARD } from '../RouteConstants';
import { getAccessToken } from './session/cookies';

const ProtectedRoutes = () => {
    const token = getAccessToken();
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(()=>{
        if(location.pathname === '/' && token){
            navigate(DASHBOARD.HOME);
        }
    },[])

    return (
        <div>{token ? (<Outlet />) : (<Navigate to={`${AUTH.SIGNIN}`} state={{ from: location }} replace />)}</div>
    )
}

export default ProtectedRoutes
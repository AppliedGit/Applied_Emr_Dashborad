import React, { useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCommonState, { useDispatch } from 'ResuableFunctions/CustomHooks';
import { updateToast } from 'Views/Common/Slice/Common_slice';

const UserAuth = () => {
    const { commonState } = useCommonState();
    const dispatch = useDispatch();
    const toastShownRef = useRef(false);
    if (commonState?.logout_triggered) return <Navigate to="/" />

    if (!commonState?.token) {
        if (!toastShownRef.current) {
            dispatch(updateToast({ type: 'error', message: 'Login first to access' }));
            toastShownRef.current = true;
        }
        return <Navigate to="/" />;
    }

    if (commonState?.user_role !== 'user') {
        if (!toastShownRef.current) {
            dispatch(updateToast({ type: 'error', message: 'Access Denied' }));
            toastShownRef.current = true;
        }
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default UserAuth;

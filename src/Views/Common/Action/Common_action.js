import axios from 'axios';
import { LoginSuccessNavigateTo } from 'ResuableFunctions/LoginSuccessNavigateTo';
import {
    updateModalShow,
    updateCanvasShow,
    updateLoginCredentials,
    updateEyeFunction,

    clearError,
    resetValidation,
    updateValidation,

    loginRequest,
    loginResponse,
    updateToast,
    updateToken, 
    logout,

    updateResetAllMenus
} from 'Views/Common/Slice/Common_slice';


export const handleUpdateModalShow = (dispatch) => {
    dispatch(updateModalShow())
}

export const handleUpdateCanvasShow = (dispatch) => {
    dispatch(updateCanvasShow())
}

export const handleLoginCredentials = (data) => (dispatch) => {
    dispatch(updateLoginCredentials(data))
}

export const handleEyeFunction = () => dispatch => {
    dispatch(updateEyeFunction())
}

export const handleClearErrors = dispatch => {
    dispatch(clearError())
}

export const handleValidation = dispatch => {
    dispatch(updateValidation())
}

export const handleResetValidation = dispatch => {
    dispatch(resetValidation())
}

// login api 
export const handleLogin = (basicAuth, navigate) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/login`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${basicAuth}`,
            }
        });

        if (data.error_code === 200) {
            dispatch(loginResponse(data?.data))
            LoginSuccessNavigateTo(data?.data?.role, navigate)
        } else {
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

export const handleBearerToken = (token) => dispatch => {
    dispatch(updateToken(token))
}

export const handleLogout = () => dispatch => {
    dispatch(logout())
}

//refresh token
export const handlerefreshToken = (refresh_token) => async (dispatch) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/refresh_token`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refresh_token}`,
            }
        });

        if (data?.error_code === 200) {
            dispatch(updateToken(data?.data?.access_token))
        } else { 
            dispatch(updateToast({ message: data?.message, type: "error" }))
        }
    } catch (err) {
        dispatch(updateToast({ message: err?.message, type: "error" }))
    }
}

//reset all 
export const handleResetAlMenus = dispatch => {
    dispatch(updateResetAllMenus())
}
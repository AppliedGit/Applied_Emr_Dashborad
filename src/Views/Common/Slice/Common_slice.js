import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'
import { decryptData, encryptData } from "Security/Crypto/Crypto";
import { create_update_modal, delete_modal, deletion_data, get_dir, train_modal, train_modal_path, train_model_progress } from "Views/Admin/Slice/Admin_slice";
import { correction_predicting, start_predicting } from "Views/User/Slice/User_slice";

const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: {
        modalShow: false,
        moalSize: "md",
        modal_from: null,
        modal_type: null,
        modal_close_btn: false,

        canvasShow: false,
        isOnline: true,
        currentNavMenuIndex: 0,
        currentMenuName: '',
        innerWidth: 0,
        innerHeight: 0,
        buttonSpinner: false,

        //login states
        usernamee: '',
        passwordd: '',
        eyeOpen: false,
        validated: false,

        //token
        token: Cookies.get("ZW1yLWxvZ3M=") ? decryptData(Cookies.get("ZW1yLWxvZ3M="))?.access_token : '',
        refresh_token: Cookies.get("ZW1yLWxvZ3M=") ? decryptData(Cookies.get("ZW1yLWxvZ3M="))?.refresh_token : '',
        user_role: Cookies.get("ZW1yLWxvZ3M=") ? decryptData(Cookies.get("ZW1yLWxvZ3M="))?.role : '',
        user_id: Cookies.get('ZW1yLWxvZ3M=') ? decryptData(Cookies.get("ZW1yLWxvZ3M="))?.user_id : '',

        //no of entries
        showing_entries: [10, 20, 50],
        pageSize: 10,
        entries_selected: false,

        //custom pagination 
        currentPage: 1,
        totalCount: 0,
        siblingCount: 1,

        //search 
        search_value: '',
        search_clicked: false,

        //apply filter
        apply_filter_clicked: false,
        apply_filter: false
    },
    reducers: {
        updateModalShow(state, actions) {
            const { type, data } = actions.payload;

            state.modalShow = true
            state.moalSize = data?.modalSize || "md"
            state.modal_from = data?.modal_from || null
            state.modal_type = data?.modal_type || null
            state.modal_close_btn = data?.modal_close_btn || false
        },
        updateCanvasShow(state, actions) {
            return {
                ...state,
                canvasShow: !state.canvasShow
            }
        },
        updateIsonline(state, action) {
            return {
                ...state,
                isOnline: action.payload
            }
        },
        updateCurrentNavMenuIndex(state, action) {
            return {
                ...state,
                currentMenuName: action.payload,
            }
        },
        updateScreenCurrentDimension(state, action) {
            return {
                ...state,
                innerWidth: action.payload?.innerWidth,
                innerHeight: action.payload?.innerHeight
            }
        },
        resetModalBox(state, action) {
            return {
                ...state,
                modalShow: false,
                moalSize: "md",
                modal_from: null,
                modal_type: null,
                modal_close_btn: false,
            }
        },

        //Toast
        updateToast(state, action) {
            return {
                ...state,
                Err: action.payload.message,
                Toast_Type: action.payload.type,
                buttonSpinner: false
            }
        },
        clearError(state, actions) {
            return {
                ...state,
                Err: null,
                Toast_Type: null
            }
        },

        //Form validation
        updateValidation(state, actions) {
            return {
                ...state,
                validated: true
            }
        },
        resetValidation(state, action) {
            return {
                ...state,
                validated: false
            }
        },

        //Login states
        updateLoginCredentials(state, action) {
            const type = Object.keys(action.payload)[0];
            switch (type) {
                case "username":
                    return {
                        ...state,
                        usernamee: action.payload?.username
                    }
                case "password":
                    return {
                        ...state,
                        passwordd: action.payload?.password
                    }
                default:
                    return
            }
        },
        updateEyeFunction(state, actions) {
            return {
                ...state,
                eyeOpen: !state.eyeOpen
            }
        },

        //Api 
        loginRequest(state, actions) {
            return {
                ...state,
                buttonSpinner: true,
                token: null
            }
        },
        loginResponse(state, action) {
            const encrypted_logs = encryptData(action.payload)
            Cookies.set('ZW1yLWxvZ3M=', encrypted_logs);
            // (ZW1yLWxvZ3M= stands) for emr-log    

            return {
                ...state,
                buttonSpinner: false,
                eyeOpen: !state.eyeOpen,
                token: action.payload?.access_token,
                refresh_token: action.payload?.refresh_token,
                user_role: action.payload?.role
            }
        },

        //Bearer token 
        updateToken(state, action) {
            const decrypted_logs = decryptData(Cookies.get("ZW1yLWxvZ3M="))
            decrypted_logs.access_token = action.payload

            const encrypted_logs = encryptData(decrypted_logs)
            Cookies.set('ZW1yLWxvZ3M=', encrypted_logs);

            return {
                ...state,
                token: action.payload ? action.payload : ''
            }
        },

        //Logout
        logout(state, actions) {
            Cookies.remove("ZW1yLWxvZ3M=");
            return {
                ...state,
                logout_triggered: true,
                token: '',
                refresh_token: '',
                user_role: '',
                usernamee: '',
                passwordd: '',
            }
        },

        updateEditedTrue(state, action) {
            return {
                ...state,
                edited: true
            }
        },
        updateEditedFalse(state, action) {
            return {
                ...state,
                edited: false
            }
        },

        //reset all menus
        updateResetAllMenus(state, action) {
            return {
                ...state,
                edited: false,
                validated: false,
                modalShow: false,
                pageSize: 10,
                currentPage: 1,
                entries_selected: false,
                search_value: '',
                search_clicked: false,
                apply_filter: false,
                apply_filter_clicked: false
            }
        },

        //pagination
        updatePaginationSize(state, action) {
            return {
                ...state,
                pageSize: action.payload
            }
        },
        updateCurrentPage(state, action) {
            return {
                ...state,
                currentPage: action.payload
            }
        },

        //search
        updateSearchValue(state, action) {
            return {
                ...state,
                search_value: action.payload,
                search_clicked: false
            }
        },
        clearSearch(state, action) {
            return {
                ...state,
                search_value: '',
                search_clicked: false
            }
        },
        updateSearchClickedTrue(state, action) {
            return {
                ...state,
                search_clicked: true,
                apply_filter: false,
                apply_filter_clicked: false,
                totalCount: 0,
                pageSize: 10,
                currentPage: 1
            }
        },
        updateSearchClickedFalse(state, action) {
            return {
                ...state,
                search_clicked: true
            }
        },

        //number of entries select
        updateEntriesCount(state, action) {
            return {
                ...state,
                currentPage: 1,
                pageSize: action.payload,
                entries_selected: true,
            }
        },

        //apply filter button click state
        updateApplyFilterClickedTrue(state, action) {
            return {
                ...state,
                apply_filter_clicked: true,
                apply_filter: true,
                search_clicked: false,
                totalCount: 0,
                pageSize: 10,
                currentPage: 1
            }
        },
        updateApplyFilterClickedFalse(state, action) {
            return {
                ...state,
                apply_filter_clicked: false,
                apply_filter: false
            }
        },
        reset_logout_triggered(state, actions) {
            state.logout_triggered = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(train_model_progress, (state, action) => {
                const { message } = action.payload

                if(message === "Training completed") {
                    state.modalShow = false
                    state.moalSize = null
                    state.modal_from = null
                    state.modal_type = null
                }
            })
            
            .addCase(train_modal_path, (state, action) => {
                state.modalShow = true
                state.moalSize = 'md'
                state.modal_from = 'Home'
                state.modal_type = 'train_confiramtion'
            })

            .addCase(train_modal, (state, action) => {
                const { type } = action.payload;

                if (type === "response") {
                    state.moalSize = 'lg'
                    state.modal_from = 'Home'
                    state.modal_type = 'start_train'
                }
            })

            .addCase(deletion_data, (state, action) => {
                state.modalShow = true
                state.moalSize = 'md'
                state.modal_from = 'Home'
                state.modal_type = 'delete_confirmation'
            })

            .addCase(delete_modal, (state, action) => {
                const { type } = action.payload;

                if (type === "response") {
                    state.modalShow = false
                    state.moalSize = null
                    state.modal_from = null
                    state.modal_type = null
                }
            })

            .addMatcher(
                function (action) {
                    return [
                        train_model_progress.toString(),
                    ].includes(action.type)
                },

                (state, action) => {
                    const { type } = action.payload

                    if (type === "request") {
                        state.modalShow = true
                        state.moalSize = 'lg'
                        state.modal_from = 'Home'
                        state.modal_type = 'start_train'
                    }
                }
            )

            .addMatcher(
                function (action) {
                    return [
                        get_dir.toString(),
                        train_modal.toString(),
                        create_update_modal.toString(),
                        start_predicting.toString(),
                        correction_predicting.toString()
                    ].includes(action.type)
                },

                (state, action) => {
                    if (action?.payload?.type === "response") setSuccessState(state, action);
                    if (action?.payload?.type === "failure") setErrorState(state, action);
                }
            )
    }
})

function setSuccessState(state, action) {
    let error_message = typeof action.payload === 'object' ? action.payload?.message : action.payload;
    state.Err = error_message;
    state.Toast_Type = "success";
}

function setErrorState(state, action) {
    let error_message = typeof action.payload === 'object' ? action.payload?.message : action.payload;
    state.Err = error_message;
    state.Toast_Type = "error";
}

const { actions, reducer } = commonSlice;

export const {
    updateModalShow,
    updateCanvasShow,
    updateIsonline,
    updateCurrentNavMenuIndex,
    updateScreenCurrentDimension,
    updateLoginCredentials,
    updateEyeFunction,
    clearError,
    updateResetAllMenus,
    resetModalBox,

    resetValidation,
    updateValidation,

    loginRequest,
    loginResponse,
    updateToast,
    updateToken,
    logout,

    updatePaginationSize,
    updateCurrentPage,
    updateSearchValue,
    clearSearch,
    updateSearchClickedTrue,
    updateSearchClickedFalse,
    updateApplyFilterClickedTrue,
    updateApplyFilterClickedFalse,

    updateEntriesCount,
    reset_logout_triggered
} = actions;

export default reducer
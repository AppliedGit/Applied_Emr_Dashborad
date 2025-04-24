import axiosInstance from 'Services/axiosInstance';
import {
    get_dir, train_modal, create_update_modal

} from 'Views/Admin/Slice/Admin_slice';


export const handle_get_dir = params => async (dispatch) => {
    try {
        dispatch(get_dir({ type: "request" }))

        const { data } = await axiosInstance.post("/list_dir", { folder_path: params || "" })

        if (data?.error_code === 200) {
            dispatch(get_dir({ type: "response", data: data?.data }))
        }
        else {
            dispatch(get_dir({ type: "failure", message: data?.message }))
        }
    } catch (Err) {
        dispatch(get_dir({ type: "failure", message: Err?.message }))
    }
}


export const handle_train_modal = params => async (dispatch) => {
    if (params?.base_path) {
        try {
            dispatch(train_modal({ type: "request", data: params?.base_path }))
            const { data } = await axiosInstance.post("/train_model", params)

            if (data?.error_code === 200) {
                dispatch(train_modal({ type: "response", data: params?.base_path }))
            }
            else {
                dispatch(train_modal({ type: "failure", data: params?.base_path, message: data?.message }))
            }
        } catch (Err) {
            dispatch(train_modal({ type: "failure", data: params?.base_path, message: Err?.message }))
        }
    } else {
        dispatch(train_modal({ type: "failure", message: 'Base path required' }))
    }
}

export const handle_create_update_modal = params => async (dispatch) => {
    let correct_error_code = params?.endpoint == '/create_class' ? 201 : 200;
    const fd = new FormData();

    if (params?.endpoint == '/create_class') {
        fd.append('folder_name', params?.folder_name)
        fd.append('no_of_classes', params?.no_of_classes)
        fd.append('class_names', params?.class_names)
        fd.append('image_class_name', params?.image_class_name)
        for (let i = 0; i < params?.images.length; i++) {
            fd.append('images', params?.images[i]);
        }
    } else {
        fd.append('folder_path', `${params?.folder_name}/train/${params?.image_class_name}`)
        for (let i = 0; i < params?.images.length; i++) {
            fd.append('files', params?.images[i]);
        }
    }

    try {
        dispatch(create_update_modal({ type: "request" }))
        const { data } = await axiosInstance.post(params?.endpoint, fd)

        if (data?.error_code === correct_error_code) {
            dispatch(create_update_modal({ type: "response", message: data?.message }))
        }
        else {
            dispatch(create_update_modal({ type: "failure", message: data?.message }))
        }
    } catch (Err) {
        dispatch(create_update_modal({ type: "failure", message: Err?.message }))
    }
}
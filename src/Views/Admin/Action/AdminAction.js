import axiosInstance from 'Services/axiosInstance';
import {
    get_dir, train_modal, create_update_modal, delete_modal,
    train_model_progress

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
            dispatch(train_modal({ type: "request" }))

            const { data } = await axiosInstance.post("/train_model", params)

            if (data?.error_code === 200) {
                dispatch(handle_train_model_progress({ path: params?.base_path, message: data?.message || '' }))
                dispatch(train_modal({ type: "response", data }))
            }
            else {
                dispatch(train_modal({ type: "failure", message: data?.message }))
            }
        } catch (Err) {
            dispatch(train_modal({ type: "failure", message: Err?.message }))
        }
    } else {
        dispatch(train_modal({ type: "failure", message: 'Base path required' }))
    }
}

export const handle_train_model_progress = (params) => async (dispatch) => {
    if (params?.path) {
        try {
            dispatch(train_model_progress({ type: "request", data: params }));

            //is_streaming is used to check if the stream is already running
            if (params?.is_streaming) return

            const response = await fetch(`${import.meta.env.VITE_API_URL}/train_model_progress`, {
                method: 'GET',
                headers: {
                    'Accept': 'text/event-stream',
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    dispatch(train_model_progress({ type: "response", data: { message: 'Stream ended.' } }));
                    break;
                }

                buffer += decoder.decode(value, { stream: true });

                let lines = buffer.split('\n\n');
                buffer = lines.pop();

                for (const line of lines) {
                    const trimmedLine = line.trim();

                    if (trimmedLine.startsWith('data: ')) {
                        let jsonStr = trimmedLine.slice(6);

                        if (jsonStr.startsWith("{") && jsonStr.endsWith("}")) {
                            jsonStr = jsonStr.replace(/'/g, '"');

                            try {
                                const data = JSON.parse(jsonStr);
                                dispatch(train_model_progress({ type: "response", data: data }));
                            } catch (err) {
                                console.error('Failed to parse JSON chunk:', jsonStr, err);
                                dispatch(train_model_progress({ type: "failure", message: err }));
                            }
                        } else {
                            console.error('Invalid JSON format detected:', jsonStr);
                        }
                    }
                }
            }

        } catch (err) {
            console.error('Stream fetch error:', err);
            dispatch(train_model_progress({ type: "failure", message: err?.message }));
        }
    } else {
        dispatch(train_model_progress({ type: "failure", message: 'Base path required' }));
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

export const handle_delete_data = params => async (dispatch) => {
    if (params?.path) {
        try {
            dispatch(delete_modal({ type: "request", data: params }))

            const { data } = await axiosInstance.post("/delete", { path: params?.path })

            if (data?.error_code === 200) {
                dispatch(delete_modal({ type: "response", data: params }))
            }
            else {
                dispatch(delete_modal({ type: "failure", message: data?.message }))
            }
        } catch (Err) {
            dispatch(delete_modal({ type: "failure", message: Err?.message }))
        }
    } else {
        dispatch(delete_modal({ type: "failure", message: 'Base path required' }))
    }
}
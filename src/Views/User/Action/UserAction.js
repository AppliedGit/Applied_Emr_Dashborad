import axiosInstance from 'Services/axiosInstance';
import {
  start_predicting, correction_predicting,
  get_printing_data

} from 'Views/User/Slice/User_slice';


export const handle_start_predicting = params => async (dispatch) => {
  const fd = new FormData();
  if (!params?.modal || !params?.phase || !params?.prediction_image?.length || !params?.excel_file?.length || !params?.upload_image?.length) dispatch(start_predicting({ type: 'failure', message: 'Please fill in all fileds' }))

  else {
    fd.append("model", params?.modal)
    fd.append("phase", params?.phase)

    for (let i = 0; i < params?.upload_image.length; i++) {
      fd.append('upload_image', params?.upload_image[i]);
    }

    for (let i = 0; i < params?.prediction_image.length; i++) {
      fd.append('prediction_image', params?.prediction_image[i]);
    }

    for (let j = 0; j < params?.excel_file.length; j++) {
      fd.append('excel_file', params?.excel_file[j]);
    }

    try {
      dispatch(start_predicting({ type: 'request' }))
      const { data } = await axiosInstance.post('/start_predict', fd)

      if (data?.error_code === 200) {
        dispatch(start_predicting({ type: 'response', data: data?.data?.results, message: data?.message }))
      } else {
        dispatch(start_predicting({ type: 'failure', message: data?.message }))
      }
    } catch (Err) {
      dispatch(start_predicting({ type: 'failure', message: Err?.message }))
    }
  }
}


export const handle_correction_predicting = params => async (dispatch) => {
  const fd = new FormData();

  if (!params?.class_name || !params?.send_image) dispatch(correction_predicting({ type: 'failure', message: 'Please fill in all fileds' }))
  else {
    fd.append("class_name", params?.class_name)
    fd.append("user_response", 'no')
    fd.append("phase", params?.phase)
    for (let i = 0; i < params?.send_image.length; i++) {
      fd.append('images', params?.send_image[i]);
    }

    try {
      dispatch(correction_predicting({ type: 'request' }))
      const { data } = await axiosInstance.post('/correct_predictions', fd)

      if (data?.error_code === 200) {
        dispatch(correction_predicting({ type: 'response', data: data?.data?.results, message: data?.message }))
      } else {
        dispatch(correction_predicting({ type: 'failure', message: data?.message }))
      }
    } catch (Err) {
      dispatch(correction_predicting({ type: 'failure', message: Err?.message }))
    }
  }
}


export const handleGetPrintData = params => async (dispatch) => {
  try {
    dispatch(get_printing_data({ type: 'request' }))
    const { data } = await axiosInstance.post("/get_report_data", params)

    if (data.error_code === 200) dispatch(get_printing_data({ type: 'response', data: data?.data || {} }))
    else dispatch(get_printing_data({ type: 'failure', message: data?.message || '' }))
  } catch (Err) {
    dispatch(get_printing_data({ type: 'failure', message: Err?.message || '' }))
  }
}
import { createSlice } from '@reduxjs/toolkit';
import { get_dir } from 'Views/Admin/Slice/Admin_slice';

const userSlice = createSlice({
  name: 'user slice',
  initialState: {
    user_data: {
      folder_type: "Use Class"
    }
  },
  reducers: {
    update_user_data(state, action) {
      Object.entries(action?.payload).forEach(([key, value]) => {
        switch (key) {
          case 'folder_type':
            state.user_data.selected_folder = ''
            state.user_data[key] = value;
            break;

          default:
            state.user_data[key] = value;
            break;
        }
      })
    },
    start_predicting(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.is_predicting = true
          state.predicted_data = []
          state.predicted_single_data = []
          break;

        case "response":
          state.is_predicting = false
          state.predicted_data = data
          state.predicted_single_data = data?.length ? [data[0]] : []
          state.user_data.folder_type = "Use Class"
          break;

        case "failure":
          state.is_predicting = false
          break;

        default:
          break;
      }
    },
    predicted_next_data(state, action) {
      const [, ...rest] = state.predicted_data || [];

      state.predicted_data = rest;
      state.predicted_single_data = rest?.length ? [rest[0]] : [];
      state.user_data.folder_type = ''
      state.user_data.selected_folder = ''
    },
    correction_predicting(state, action) {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.correction_predicting_glow = true
          break;

        case "response":
          state.correction_predicting_glow = false
          state.user_data.correct_prediction_modal = false
          break;

        case "failure":
          state.correction_predicting_glow = false
          break;

        default:
          break;
      }
    }
  },
  extraReducers: builder => {
    builder

      .addMatcher(
        (action) => [get_dir.toString()].includes(action.type),
        (state, action) => {

          if (action?.payload?.type === "request") {
            state.user_data = {};
            state.predicted_data = [];
            state.predicted_single_data = [];
          }
        })
  }
});

const { actions, reducer } = userSlice;

export const {
  update_user_data, start_predicting, correction_predicting,
  predicted_next_data

} = actions;

export default reducer;
import { createSlice } from '@reduxjs/toolkit';
import { get_dir } from 'Views/Admin/Slice/Admin_slice';

const userSlice = createSlice({
  name: 'user slice',
  initialState: {
    user_data: {},
    phases: [
      "R Phase Raise Direction", "R Phase Lower Direction", "Y Phase Raise Direction",
      "Y Phase Lower Direction", "B Phase Raise Direction", "B Phase Lower Direction"
    ]
  },
  reducers: {
    update_user_data(state, action) {
      Object.entries(action?.payload).forEach(([key, value]) => {

        switch (key) {
          case "modal":
            state.user_data.modal = value;
            state.user_data.folder_type = "Use Class"
            state.user_data.phase = "R_Phase_Raise_Direction"
            break;

          case "phase":
            state.user_data = {
              modal: state.user_data.modal || '',
              [key]: value
            }
            break;

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
          break;

        case "response":
          state.is_predicting = false
          state.predicted_data = data
          state.user_data.folder_type = "Use Class"
          break;

        case "failure":
          state.is_predicting = false
          break;

        default:
          break;
      }
    },
    predicted_next_data(state) {
      let currentIndex = state.phases
        .map((item) => item?.replaceAll(" ", "_"))
        .findIndex(phase => phase === state.user_data.phase);

      state.user_data = {
        modal: state.user_data.modal || '',
        folder_type: 'Use Class',
        phase: state.phases[currentIndex + 1]?.replaceAll(" ", "_") || state.user_data.phase
      };
      state.predicted_data = []
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
    },
    get_printing_data(state, action) {
      const { type, data } = action.payload;

      let printing_data = data?.map(item => {
        
        let converted_graph_data = item?.graph_data?.map(obj => {
          const [key, value] = Object.entries(obj)[0];
          return { x: key, y: value };
        }) || []

        return {
          ...item,
          graph_data: converted_graph_data
          }
      });


      console.log(printing_data)

      switch (type) {
        case "request":
          state.getting_print_data_glow = true
          break;

        case "response":
          state.getting_print_data_glow = false
          state.printing_data = printing_data
          break;

        case "failure":
          state.getting_print_data_glow = false
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
            state.user_data.folder_type = "Use Class";
            state.user_data.phase = "R_Phase_Raise_Direction";
            state.predicted_data = [];
          }
        })
  }
});

const { actions, reducer } = userSlice;

export const {
  update_user_data, start_predicting, correction_predicting,
  predicted_next_data, get_printing_data

} = actions;

export default reducer;
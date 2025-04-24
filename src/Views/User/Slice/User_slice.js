import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   modelRef: '',
//   imageFile: null,
//   csvFile: null,
//   imagePreviewUrl: '',
//   previewURL: '',
//   isLoading: false,
//   showEnhancer: false,
//   showResult: false,
//   showModal: false,
//   selectedClass: '',
//   newModelRef: '',
//   classNames: ['Class 1', 'Class 2', 'Class 3'],
//   folders: [],
//   imageModelRef: '',
// };

const uploadSlice = createSlice({
  name: 'upload',
  // initialState,
  reducers: {
    setModelRef: (state, action) => { state.modelRef = action.payload },
    setImageFile: (state, action) => { state.imageFile = action.payload },
    setCsvFile: (state, action) => { state.csvFile = action.payload },
    setImagePreviewUrl: (state, action) => { state.imagePreviewUrl = action.payload },
    setPreviewURL: (state, action) => { state.previewURL = action.payload },
    setIsLoading: (state, action) => { state.isLoading = action.payload },
    setShowEnhancer: (state, action) => { state.showEnhancer = action.payload },
    setShowResult: (state, action) => { state.showResult = action.payload },
    setShowModal: (state, action) => { state.showModal = action.payload },
    setSelectedClass: (state, action) => { state.selectedClass = action.payload },
    setNewModelRef: (state, action) => { state.newModelRef = action.payload },
    setFolders: (state, action) => { state.folders = action.payload },
    setImageModelRef: (state, action) => { state.imageModelRef = action.payload },
    addFolder: (state, action) => {
      const folder = action.payload;
      if (!state.folders.includes(folder)) {
        state.folders.push(folder);
      }
    },


    imageProcessFlow: (state, action) => {
      const { type, data } = action.payload;

      switch (type) {
        case "request":
          state.isLoading = true;
          state.showResult = false;
          break;

        case "response":
          state.isLoading = false;
          state.showResult = true;
          state.previewURL = data.previewURL;
          break;

        case "failure":
          state.isLoading = false;
          state.showResult = false;
          break;

        default:
          break;
      }
    }
  }
});

export const {
  setModelRef, setImageFile, setCsvFile, setImagePreviewUrl, setPreviewURL,
  setIsLoading, setShowEnhancer, setShowResult, setShowModal, setSelectedClass,
  setNewModelRef, setFolders, setImageModelRef, addFolder,
  imageProcessFlow // export this new action
} = uploadSlice.actions;

export default uploadSlice.reducer;

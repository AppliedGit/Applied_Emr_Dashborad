import axiosInstance from '../api/axiosInstance';
import { setIsLoading, setShowResult, setPreviewURL } from '../features/uploadSlice';

const handleUploadToServer = async () => {
  if (!imageFile || !csvFile) return;

  dispatch(setIsLoading(true));
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("csv", csvFile);
  formData.append("modelRef", modelRef);

  try {
    const response = await axiosInstance.post('/compare', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const { previewURL } = response.data;
    dispatch(setPreviewURL(previewURL));
    dispatch(setShowResult(true));
  } catch (error) {
    console.error("Upload failed:", error);
    dispatch(setShowResult(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

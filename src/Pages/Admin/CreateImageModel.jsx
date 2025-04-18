import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Icons from '../../Utils/Icons';
import UploadImg from "../../assets/UploadImg.png";

const CreateImageModel = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEnhancer, setShowEnhancer] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setShowEnhancer(false);
    }
  };

  const handleNextClick = () => {
    if (selectedFile) {
      setIsLoading(true);
      setShowEnhancer(false);
      setTimeout(() => {
        setIsLoading(false);
        setShowEnhancer(true);
      }, 1500);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    setShowEnhancer(false);
  };

  const handleTrain = () => {
    alert('Training process started...');
  };

  const handleLabel = () => {
    alert('Labeling interface opened...');
  };

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newCard = {
        name: name || 'Untitled Image',
        date: new Date().toLocaleString(),
        src: previewURL || '/graph.png',
      };
      const stored = JSON.parse(localStorage.getItem(`cards-${type}`)) || [];
      localStorage.setItem(`cards-${type}`, JSON.stringify([...stored, newCard]));

      setIsUploading(false);
      navigate(`/folders/${type}`);
    }, 1500);
  };

  return (
    <div className="container py-4">
      {/* <h5 className="heading-1 mb-4 d-flex align-items-center gap-2">
        <span style={{ fontSize: '1.20rem', marginBottom: "4px", cursor: "pointer" }}>
          {Icons.LeftArrow}
        </span>
        Create Image Model
      </h5> */}
       <h5 className="heading-1 mb-4  d-flex align-items-center gap-2">
        <Link to="/folders/raw" style={{marginBottom:"6px"}}>
          <span style={{ fontSize: '1.20rem', marginBottom: "4px", cursor: "pointer" }}>
            {Icons.LeftArrow}
          </span>
        </Link>
        Create Image Model
      </h5>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="create-card p-4 bg-white rounded shadow-sm h-100" style={{ minHeight: '650px' }}>
            <h6 className="heading-3 mb-4">Image Module</h6>

            <label className="heading-2 mb-4 form-label">Image Name</label>
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Enter image name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <label className="heading-2 mt-3 form-label">Upload Image</label>
            <div
              className="border rounded p-4 mt-4 text-center position-relative"
              style={{borderStyle:'dashed', minHeight: 140}}
            >
              <input
                type="file"
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                onChange={handleFileChange}
              />

              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: 130, objectFit: 'contain' }}
                />
              ) : (
                <>
                  {Icons.Browse}
                  <p className="mb-3 text-muted">
                    Drop file or <span className="text-primary">Browse</span>
                  </p>
                  <small className="text-secondary">Format: jpg, png | Max size: 25MB</small>
                </>
              )}
            </div>

            <button
              className="btn btn-primary w-100 mt-4"
              onClick={handleNextClick}
              disabled={!selectedFile}
              style={{ background: "#2D9AE5" }}
            >
              Next
            </button>
          </div>
        </div>

        <div className="col-md-6">
          <div className="enhancer-card p-4 bg-white rounded shadow-sm h-100 d-flex flex-column" style={{ minHeight: '650px' }}>
            <h6 className="heading-1 mb-3 text-start">Image Enhancer</h6>

            <div className="text-center mb-3">
              {isLoading ? (
                <div>
                  <button className="btn btn-primary" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </button>
                  <p className="mt-2">Enhancing Image...</p>
                </div>
              ) : showEnhancer && previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: 250, objectFit: 'contain' }}
                />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: '100%', minHeight: '580px' }}>
                  <img src={UploadImg} alt="UploadImg" className='UploadImg'/>
                  <p className="mt-2">No image loaded yet</p>
                </div>
              )}
            </div>

            {showEnhancer && !isLoading && (
              <>
                <div className="mb-3">
                  <label className="w-100 form-label fw-semibold">Description</label>
                  <textarea
                    className="w-100 form-control"
                    rows="3"
                    defaultValue="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Fault</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    defaultValue="Lorem Ipsum is not simply random text..."
                  />
                </div>

                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-outline-secondary flex-fill" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="btn btn-outline-primary flex-fill" onClick={handleTrain}>
                    Train
                  </button>
                  <button className="btn btn-outline-info flex-fill" onClick={handleLabel}>
                    Label
                  </button>
                  <button className="btn btn-primary flex-fill" onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateImageModel;



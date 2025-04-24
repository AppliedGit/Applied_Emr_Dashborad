import React, { useState } from 'react';
import { Spinner, Form, Button } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import UploadImg from 'Assets/UploadImg.png';
import Icons from 'Utils/Icons'; // Assuming Trash icon used
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../Action/UserAction';

const Userhome = () => {
  // const navigate = useNavigate();
  const [modelRef, setModelRef] = useState('G1');
  const [imageFile, setImageFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEnhancer, setShowEnhancer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [newModelRef, setNewModelRef] = useState('');
  const [classNames, setClassNames] = useState(['Class 1', 'Class 2', 'Class 3']);
  const [folders, setFolders] = useState([]);
  const [imageModelRef, setImageModelRef] = useState('');
  const description = "Contrary to popular belief, Lorem Ipsum is not simply random text...";
  const fault = "Contrary to popular belief, Lorem Ipsum is not simply random text...";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImagePreviewUrl(preview);
      setPreviewURL(preview);
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCsvFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewUrl('');
    setPreviewURL('');
  };

  const handleRemoveCSV = () => {
    setCsvFile(null);
  };

  const handleSubmit = () => {
    if (!imageFile) return alert('Please upload an image!');
    setIsLoading(true);
    setShowEnhancer(false);
    setShowResult(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowEnhancer(true);
      setShowResult(true);
    }, 2000);
  };

  const confirmUpload = () => {
    setShowModal(false);
    // navigate("/create", { state: { selectedClass } });
  };

  const handleAddNewFolder = () => {
    const trimmed = newModelRef.trim();
    if (!trimmed) return alert('Please enter a valid name.');
    if (folders.includes(trimmed)) return alert('Folder already exists.');

    setFolders((prev) => [...prev, trimmed]);
    setImageModelRef(trimmed);
    setNewModelRef('');
  };

  return (
    <div className="container py-4">
      <h5 className="heading-1 mb-4 d-flex align-items-center gap-2">Compare Image</h5>

      <div className="row g-4 align-items-stretch">
        {/* Left Panel */}
        <div className="col-sm-12 col-md-6">
          <div className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column">
            <h6 className="heading-3 mb-4">Upload Inputs</h6>

            <Form.Group className="mb-3">
              <Form.Label className="form-label heading-2">Image Model Ref</Form.Label>
              <Form.Select value={modelRef} onChange={(e) => setModelRef(e.target.value)}>
                <option value="">Select a Model</option>
                <option>G1</option>
                <option>G2</option>
                <option>G3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="form-label heading-2">Upload Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
            </Form.Group>

            {imageFile && (
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <img src={imagePreviewUrl} alt="preview" width={60} height={60} className="rounded border" />
                  <div>
                    <div>{imageFile.name}</div>
                    <small className="text-muted">{new Date().toLocaleString()}</small>
                  </div>
                </div>
                <Button variant="link" className="text-danger" onClick={handleRemoveImage}>
                  {Icons.Trash}
                </Button>
              </div>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="form-label heading-2">Upload CSV File</Form.Label>
              <Form.Control type="file" accept=".csv" onChange={handleCSVUpload} />
              {csvFile && (
                <div className="d-flex align-items-center mt-2">
                  <div className="me-2 text-success"><FaUpload size={20} /></div>
                  <div className="flex-grow-1">
                    <div>{csvFile.name}</div>
                    <small className="text-muted">{new Date().toLocaleString()}</small>
                  </div>
                  <Button variant="link" className="ms-auto text-danger" onClick={handleRemoveCSV}>
                    {Icons.Trash}
                  </Button>
                </div>
              )}
            </Form.Group>

            <div className="mt-auto text-end">
              <button className="btn w-50 btn-primary" onClick={handleSubmit}>Next</button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-sm-12 col-md-6">
          <div className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column">
            <h6 className="heading-3 mb-3">Image Result</h6>

            <div className="text-center mb-3 flex-grow-1 d-flex align-items-center justify-content-center">
              {isLoading ? (
                <div>
                  <button className="btn btn-primary" disabled><Spinner animation="border" size="sm" /> Loading...</button>
                  <p className="mt-2">Enhancing Image...</p>
                </div>
              ) : showEnhancer && previewURL ? (
                <img src={previewURL} alt="Preview" className="img-fluid rounded" style={{ maxHeight: 250, objectFit: 'contain' }} />
              ) : (
                <div className="text-muted d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '500px' }}>
                  <img src={UploadImg} alt="Upload Placeholder" style={{ maxHeight: 150 }} />
                  <p className="mt-2">No image loaded yet</p>
                </div>
              )}
            </div>

            {showResult && !isLoading && (
              <>
                <div className="mb-3">
                  <Form.Label className="heading-2">Description</Form.Label>
                  <div className="border p-2 rounded bg-light" style={{ height: "60px" }}>{description}</div>
                </div>

                <div className="mb-3">
                  <Form.Label className="heading-2">Fault</Form.Label>
                  <div className="border p-2 rounded bg-light" style={{ height: "60px" }}>{fault}</div>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <button className="btn w-50 btn-outline-primary" onClick={() => setShowModal(true)}>No</button>
                  <button className="btn w-50 btn-primary">Yes</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Class Name</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="d-flex gap-2 mb-3 p-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add New Image Model Ref"
                  value={newModelRef}
                  onChange={(e) => setNewModelRef(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddNewFolder}>Add</button>
              </div>
              <div className="text-center text-primary mb-2">— OR —</div>
              <div className="modal-body" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {classNames.map((name, index) => (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="classOptions"
                      value={name}
                      checked={selectedClass === name}
                      onChange={(e) => setSelectedClass(e.target.value)}
                    />
                    <label className="form-check-label">{name}</label>
                  </div>
                ))}
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={confirmUpload} disabled={!selectedClass}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userhome;











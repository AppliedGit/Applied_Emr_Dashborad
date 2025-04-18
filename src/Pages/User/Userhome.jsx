import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Icons from '../../Utils/Icons';
import UploadImg from "../../assets/UploadImg.png";

const Userhome = () => {
  const navigate = useNavigate();

  const [modelRef, setModelRef] = useState('G1');
  const [imageFile, setImageFile] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showEnhancer, setShowEnhancer] = useState(false);
  const [previewURL, setPreviewURL] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [description, setDescription] = useState('Contrary to popular belief, Lorem Ipsum is not simply random text...');
  const [fault, setFault] = useState('Contrary to popular belief, Lorem Ipsum is not simply random text...');


  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
   const [newModelRef, setNewModelRef] = useState('');
  const [classNames, setClassNames] = useState(['Class 1', 'Class 2', 'Class 3']);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreviewUrl('');
  };

  const handleRemoveCSV = () => {
    setCsvFile(null);
  };

  const handleSubmit = () => {
    if (!imageFile) return alert("Please upload an image!");
    setIsLoading(true);
    setShowEnhancer(false);
    setShowResult(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowEnhancer(true);
      setShowResult(true);
      setPreviewURL(imagePreviewUrl);
    }, 2000);
  };

  const confirmUpload = () => {
    setShowModal(false);
    // navigate("/create", { state: { selectedClass } }); 
  };



  // const handleAddClassCount = () => {
  //   setClassNames((prev) => {
  //     const diff = classCount - prev.length;
  //     if (diff > 0) return [...prev, ...Array(diff).fill('')];
  //     else if (diff < 0) return prev.slice(0, classCount);
  //     return prev;
  //   });
  // };


  const handleAddNewFolder = () => {
    if (newModelRef.trim() === '') {
      alert('Please enter a valid name.');
      return;
    }
    if (folders.includes(newModelRef.trim())) {
      alert('Folder already exists.');
      return;
    }
    setFolders((prev) => [...prev, newModelRef.trim()]);
    setImageModelRef(newModelRef.trim());
    setNewModelRef('');
  };
  return (
    <div className="container py-4">
      <h5 className="heading-1 mb-4 d-flex align-items-center gap-2">
        Compare Image
      </h5>

      <div className="row g-4">
        {/* Left Panel */}
        <div className="col-md-6">
          <div className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column justify-content-between" style={{ minHeight: '640px' }}>
            <h6 className="heading-3 mb-4">Upload Inputs</h6>

            <label className="form-label heading-2">Image Model Ref</label>
            <select
              className="form-select mb-4"
              value={modelRef}
              onChange={(e) => setModelRef(e.target.value)}
            >
              <option value="">Select a Model</option>
              <option>G1</option>
              <option>G2</option>
              <option>G3</option>
            </select>

            <Form.Group className="mb-3">
              <Form.Label className="form-label heading-2">Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Form.Group>

            {imageFile && (
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={imagePreviewUrl}
                    alt="preview"
                    width={60}
                    height={60}
                    className="rounded border"
                  />
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
              <Form.Label className="fw-semibold">Upload CSV File</Form.Label>
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
              />
              {csvFile && (
                <div className="d-flex align-items-center mt-2">
                  <div className="me-2 text-success">
                    <FaUpload size={20} />
                  </div>
                  <div className="flex-grow-1">
                    <div>{csvFile.name}</div>
                    <small className="text-muted">{new Date().toLocaleString()}</small>
                  </div>
                  <Button
                    variant="link"
                    className="ms-auto text-danger"
                    onClick={handleRemoveCSV}
                  >
                    {Icons.Trash}
                  </Button>
                </div>
              )}
            </Form.Group>

            <div className="mt-auto text-end">
              <button
                className="btn w-50"
                style={{ backgroundColor: "#2D9AE5", color: "#FFFFFF" }}
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-md-6">
          <div className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column justify-content-between" style={{ minHeight: '640px' }}>
            <h6 className="heading-3 mb-3">Image Result</h6>

            <div className="text-center mb-3 flex-grow-1 d-flex align-items-center justify-content-center">
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
                  <img src={UploadImg} alt="UploadImg" className='UploadImg' />
                  <p className="mt-2">No image loaded yet</p>
                </div>
              )}
            </div>

            {showResult && !isLoading && (
              <>
                <div className="mb-3">
                  <label className="heading-2">Description</label>
                  <div className="border p-2 rounded bg-light" style={{ height: "60px" }}>
                    {description || '—'}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="heading-2">Fault</label>
                  <div className="border p-2 rounded bg-light" style={{ height: "60px" }}>
                    {fault || '—'}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn w-50 mt-auto btn-outline-primary"
                    onClick={() => setShowModal(true)}
                    style={{ color: "#2D9AE5" }}
                  >
                    No
                  </button>
                  <button className="btn btn-primary w-50" style={{ backgroundColor: "#2D9AE5" }}>
                    Yes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Class Selection Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Class Name</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="d-flex gap-2 mb-4 p-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add New Image Model Ref"
                  value={newModelRef}
                  onChange={(e) => setNewModelRef(e.target.value)}
                />
                <button className="btn" style={{ backgroundColor: "#2D9AE5", color: "#FFFFFF" }} onClick={handleAddNewFolder}>Add</button>
              </div>
              <div className="text-center mb-2"style={{color:"#2D9AE5"}}>-OR-</div>
              <div className="modal-body">
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
                    <label className="form-check-label">
                      {name || `Class Name ${index + 1}`}
                    </label>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn" style={{ backgroundColor: "#2D9AE5", color: "#FFFFFF" }} onClick={confirmUpload} disabled={!selectedClass}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userhome;







import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Icons from '../../Utils/Icons';
import { Link } from 'react-router-dom';

const Create = () => {
  const [folders, setFolders] = useState(["G1", "G2"]); // Dynamic folder list
  const [imageModelRef, setImageModelRef] = useState('G1');
  const [newModelRef, setNewModelRef] = useState('');
  const [classCount, setClassCount] = useState(3);
  const [classNames, setClassNames] = useState(Array(3).fill(''));

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadDate, setUploadDate] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewURL(fileURL);
      setUploadDate(new Date());
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewURL(null);
    setUploadDate(null);
  };

  const handleAddClassCount = () => {
    setClassNames((prev) => {
      const diff = classCount - prev.length;
      if (diff > 0) return [...prev, ...Array(diff).fill('')];
      else if (diff < 0) return prev.slice(0, classCount);
      return prev;
    });
  };

  const handleClassNameChange = (index, value) => {
    const updated = [...classNames];
    updated[index] = value;
    setClassNames(updated);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please upload an image first.');
      return;
    }
    setShowModal(true);
  };

  const confirmUpload = () => {
    if (!selectedClass) {
      alert('Please select a class!');
      return;
    }
    setShowModal(false);
    setIsUploading(true);

    setTimeout(() => {
      alert('Image uploaded successfully!');
      setIsUploading(false);
    }, 1500);
  };

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
        <Link to="/" style={{ marginBottom: "6px" }}>
          <span style={{ fontSize: '1.20rem', marginBottom: "4px", cursor: "pointer" }}>
            {Icons.LeftArrow}
          </span>
        </Link>
        Create Image Model
      </h5>

      <div className="row g-4">
        {/* Left Panel */}
        <div className="col-md-6">
          <div className="p-4 bg-white rounded shadow-sm h-100" style={{ minHeight: '640px' }}>
            <h6 className="heading-3 mb-4">Image Module</h6>

            <label className="form-label heading-2">Image Model Ref</label>
            <select
              className="form-select mb-3"
              value={imageModelRef}
              onChange={(e) => setImageModelRef(e.target.value)}
            >
              {folders.map((folder, index) => (
                <option key={index} value={folder}>{folder}</option>
              ))}
            </select>

            <div className="text-center mb-2"style={{color:"#2D9AE5"}}>-OR-</div>

            <div className="d-flex gap-2 mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Add New Image Model Ref"
                value={newModelRef}
                onChange={(e) => setNewModelRef(e.target.value)}
              />
              <button className="btn " style={{ backgroundColor: "#2D9AE5", color: "#FFFFFF" }} onClick={handleAddNewFolder}>Add</button>
            </div>

            <label className="form-label heading-2">No. of Classes</label>
            <div >
              <div className="row g-2 mb-3">
                <div className="col-12 col-md-auto">
                  <label className="form-label">Enter Class Count</label>
                  <input
                    type="text"
                    className="form-control"
                    value={classCount}
                    onChange={(e) => setClassCount(Number(e.target.value))}
                    placeholder="Enter a number"
                  />
                </div>
                <div className="col-12 col-md-auto d-flex align-items-end">
                  <button
                    className="btn w-100 "
                    style={{ backgroundColor: "#2D9AE5", color: "#FFFFFF" }}
                    onClick={handleAddClassCount}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Repeat rows here if needed */}
            </div>





            <div className="d-flex flex-wrap gap-2" style={{ maxHeight: '230px', overflowY: 'auto' }}>
              {classNames.map((name, i) => (
                <input
                  key={i}
                  type="text"
                  className="form-control"
                  placeholder="Enter Class Name"
                  style={{ flex: '1 0 48%' }}
                  value={name}
                  onChange={(e) => handleClassNameChange(i, e.target.value)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-md-6">
          <div className="p-4 bg-white rounded shadow-sm h-100 d-flex flex-column justify-content-between" style={{ minHeight: '650px' }}>
            <h6 className="heading-3 mb-3">Upload Image</h6>

            <div className="border border-primary border-2 rounded position-relative text-center p-4 mb-3" style={{ borderStyle: 'dashed', height: '180px' }}>
              <input
                type="file"
                accept="image/*"
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                onChange={handleFileChange}
              />
              <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <div>{Icons.Browse}</div>
                <p className="text-muted mb-0">Drop file or Browse</p>
                <small className="text-secondary">Format: png, jpg, jpeg & Max file size: 25 MB</small>
              </div>
            </div>

            {previewURL && (
              <div className="position-relative d-flex justify-content-center align-items-center bg-light rounded"
                style={{ minHeight: '300px', width: '100%', maxWidth: '574px', margin: '0 auto' }}>
                <img
                  src={previewURL}
                  alt="Uploaded"
                  className="img-fluid border rounded mt-3"
                  style={{
                    width: '90%',
                    maxWidth: '450px',
                    maxHeight: '280px',
                    objectFit: 'contain',
                  }}
                />
                <button
                  className="btn btn-light position-absolute top-0 end-0 me-3 p-0"
                  onClick={handleDelete}
                  style={{ width: '30px', height: '30px' }}
                >
                  {Icons.Trash}
                </button>
              </div>
            )}

            <Button
              className="btn w-100 mt-auto"
              onClick={handleUpload}
              disabled={isUploading}
              style={{ backgroundColor: "#2D9AE5", color: "#FFFFFF" }}
            >
              {isUploading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Uploading...
                </>
              ) : (
                'Update'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Class Selection */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Class Name</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
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

export default Create;




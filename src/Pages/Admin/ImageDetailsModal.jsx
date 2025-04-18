import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ImageDetailsModal = ({ show, onClose, images = [] }) => {


  return (
    <>
      <Modal show={show} onHide={onClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Class Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {images.map((img, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card h-100">
                  <img
                    src={img.url}
                    alt={`Image ${index}`}
                    className="card-img-top"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body p-2">
                    <p className="card-title fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Name Of the Image</p>
                    <p className="card-text text-muted" style={{ fontSize: '0.8rem' }}>
                      Date: {img.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>


    </>
  );
};

export default ImageDetailsModal;



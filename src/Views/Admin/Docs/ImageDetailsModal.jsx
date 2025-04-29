import ButtonComponent from 'Components/Button/Button';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'ResuableFunctions/CustomHooks';
import Icons from 'Utils/Icons'; 
import { deletion_data } from '../Slice/Admin_slice';

const ImageDetailsModal = ({ show, onClose, images = [], deletion_path, folder, file }) => {
  const dispatch = useDispatch();

  return (
    <Modal show={show} onHide={onClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>{`${folder}/${file}/Image`}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: '70vh', overflowY: 'auto' }}>
        <div className="row">
          {images?.map((img, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={img?.cdn_url || ''}
                  alt={`Image ${index}`}
                  className="card-img-top"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body p-2 row align-items-center">
                  <div className="col-9">
                    <p className="card-title fw-bold mb-0" style={{ fontSize: '0.9rem' }}>{img?.name || ''}</p>
                  </div>
                  <div className="col-3">
                    <ButtonComponent
                      type="button"
                      className="btn py-2"
                      clickFunction={() => dispatch(deletion_data({ path: img?.path, from: 'image_deletion', type: 'Image', name: img?.name }))}
                      buttonName={Icons?.Trash}
                      btnDisable={deletion_path}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageDetailsModal;



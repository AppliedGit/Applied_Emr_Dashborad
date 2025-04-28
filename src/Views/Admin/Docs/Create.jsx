import React, { useEffect } from 'react';
import Icons from 'Utils/Icons';
import ButtonComponent from 'Components/Button/Button';
import { Link } from 'react-router-dom';
import useCommonState, { useDispatch } from 'ResuableFunctions/CustomHooks';
import { handle_create_update_modal, handle_get_dir } from '../Action/AdminAction';
import { update_create_image_modal } from '../Slice/Admin_slice';
import { updateToast } from 'Views/Common/Slice/Common_slice';
import ButtonSpinner from 'Components/Spinner/ButtonSpinner';
import SpinnerComponent from 'Components/Spinner/Spinner';

const Create = () => {
  const { adminState } = useCommonState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handle_get_dir())
  }, [])

  const handleDelete = (indexToRemove) => {
    const updated = [...adminState.create_image_modal.images];
    updated.splice(indexToRemove, 1);
    dispatch(update_create_image_modal({ images: updated }));
  };

  const handleCheck = () => {
    let root = adminState?.create_image_modal
    if (!root?.folder_name || !root?.class_names?.length || !(root?.images instanceof FileList ? Array.from(root.images) : [])?.length) {
      dispatch(updateToast({ type: 'error', message: 'please fill in all fields' }))
      return
    }
    dispatch(update_create_image_modal({ upload_modal: true }))
  };

  const handleUploadData = () => {
    let root = adminState?.create_image_modal
    if (!root?.folder_name || !root?.class_names?.length || !(root?.images instanceof FileList ? Array.from(root.images) : [])?.length || !root?.image_class_name) {
      dispatch(updateToast({ type: 'error', message: 'please fill in all fields' }))
      return;
    }
    dispatch(handle_create_update_modal(root))
  };

  return (
    <div className="container py-4">
      <h5 className="heading-1 mb-4 d-flex align-items-center gap-2">
        <Link to="/admin_dashboard" style={{ marginBottom: "6px" }}>
          <span style={{ fontSize: '1.20rem', marginBottom: "4px", cursor: "pointer" }}>{Icons.LeftArrow}</span>
        </Link>
        Create Image Model
      </h5>

      {adminState?.dir_glow ?
        <div className="row align-items-center justify-content-center user_home_height">
          <div className="col-6 text-center">
            <SpinnerComponent variant="primary" />
            <p className='mt-1'>Collecting available models..</p>
          </div>
        </div>
        :
        <div className="row g-4">
          <div className="col-md-6">
            <div className="p-4 bg-white rounded-4 shadow-sm user_home_height">
              <h6 className="heading-3 mb-4">Image Module</h6>
              <div className="row">
                {["Create new model", "Update model"]?.map((item, ind) =>
                  <div className="col" key={ind}>
                    <input
                      type="radio"
                      name="modal"
                      value={item}
                      id={item + ind}
                      onChange={(e) => dispatch(update_create_image_modal({ modal_type: e.target.value }))}
                      checked={item === adminState?.create_image_modal?.modal_type}
                    />
                    <label htmlFor={item + ind} className="form-label ps-2">{item}</label>
                  </div>
                )}
              </div>

              {adminState?.create_image_modal?.modal_type === 'Update model' ?
                <select className="form-select mb-4" value={adminState?.create_image_modal?.folder_name || ''} onChange={(e) => dispatch(update_create_image_modal({ folder_name: e.target.value }))}>
                  <option value="">Select folder</option>
                  {Array.isArray(adminState?.dir_data) &&
                    adminState?.dir_data?.map((item, itemIdx) =>
                      <option key={itemIdx} value={item.name}>{item.name}</option>
                    )}
                </select>
                :
                <div className="d-flex gap-2 mb-4">
                  <input type="text" className="form-control" placeholder="Add New Image Model Ref" value={adminState?.create_image_modal?.folder_name} onChange={(e) => dispatch(update_create_image_modal({ folder_name: e.target.value }))} />
                </div>
              }

              <label className="form-label heading-2 mt-3">Classes</label>
              <div className="row g-2 mb-3 align-items-end">
                <div className="col-10">
                  <input type="text" className="form-control" value={adminState?.create_image_modal?.new_class_name} onChange={(e) => dispatch(update_create_image_modal({ new_class_name: e.target.value }))} placeholder="Enter New Class" />
                </div>
                <div className="col-2">
                  <button className="btn w-100" style={{ backgroundColor: "#2D9AE5", color: "#FFFFFF" }} onClick={(e) => dispatch(update_create_image_modal({ add_new_class: e.target.value }))} disabled={!adminState?.create_image_modal?.new_class_name}>
                    Add
                  </button>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2" style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                {adminState?.create_image_modal?.class_names?.map((name, i) => (
                  <input key={i} type="text" className="form-control pe-none" placeholder="Enter Class Name" style={{ flex: '1 0 48%' }} value={name} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-4 bg-white rounded-4 shadow-sm  d-flex flex-column user_home_height">
              <h6 className="heading-3 mb-3">Upload Image</h6>

              <div className="border border-primary border-2 rounded position-relative text-center p-4 mb-3"
                style={{ borderStyle: 'dashed', height: '180px' }} >
                <input
                  type="file"
                  accept="image/*"
                  className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                  onChange={(e) => dispatch(update_create_image_modal({ images: e.target.files }))}
                  multiple
                />
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                  <div>{Icons.Browse}</div>
                  <p className="text-muted mb-0">Drop file or Browse</p>
                  <small className="text-secondary">Format: png, jpg, jpeg & Max file size: 25 MB</small>
                </div>
              </div>

              {/* SCROLLABLE IMAGE PREVIEW SECTION */}
              <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="mb-3">
                {Array.from(adminState?.create_image_modal?.images || [])?.map((file, index) => (
                  <div
                    key={index}
                    className="position-relative d-flex justify-content-center align-items-center bg-light rounded mb-3"
                    style={{
                      minHeight: '300px',
                      width: '100%',
                      maxWidth: '574px',
                      margin: '0 auto',
                    }}
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index}`}
                      className="img-fluid border rounded mt-3"
                      style={{
                        width: '90%',
                        maxWidth: '450px',
                        maxHeight: '280px',
                        objectFit: 'contain',
                      }}
                    />
                    <button
                      className="btn btn-light position-absolute top-0 end-0 me-3 mt-3 p-0 d-flex justify-content-center align-items-center"
                      onClick={() => handleDelete(index)}
                      style={{ width: '30px', height: '30px' }}
                    >
                      {Icons.Trash}
                    </button>
                  </div>
                ))}
              </div>

              <ButtonComponent
                className="btn w-100 mt-auto btn-primary"
                clickFunction={handleCheck}
                buttonName={adminState?.create_image_modal?.modal_type}
              />
            </div>
          </div>

        </div>
      }

      {/* Modal for Class Selection */}
      {adminState?.create_image_modal?.upload_modal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Class Name</h5>
                <button type="button" className="btn-close" onClick={() => dispatch(update_create_image_modal({ upload_modal: false }))}></button>
              </div>
              <div className="modal-body">
                {adminState?.create_image_modal?.class_names?.map((name, index) => (
                  <div className="form-check" key={index}>
                    <input className="form-check-input" type="radio" name="classOptions" id={name} value={name} checked={name === adminState?.create_image_modal?.image_class_name} onChange={(e) => dispatch(update_create_image_modal({ image_class_name: e.target.value }))} />
                    <label className="form-check-label" htmlFor={name}>
                      {name || `Class Name ${index + 1}`}
                    </label>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <div className="col">
                  <ButtonComponent
                    className='btn-secondary w-100'
                    clickFunction={() => dispatch(update_create_image_modal({ upload_modal: false }))}
                    buttonName="Cancel"
                  />
                </div>

                <div className="col">
                  {
                    adminState?.create_update_modal_spinner ?
                      <ButtonSpinner title="Saving..." spinner_width_height="1.5rem" className="py-1 btn-primary" />
                      :
                      <ButtonComponent
                        className='btn-primary w-100'
                        clickFunction={handleUploadData}
                        buttonName="Submit"
                      />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { FaRegFile } from 'react-icons/fa';
import useCommonState from 'ResuableFunctions/CustomHooks';
import { handle_get_dir } from 'Views/Admin/Action/AdminAction';
import { get_printing_data, predicted_next_data, update_user_data } from '../Slice/User_slice';
import ShortUniqueId from 'short-unique-id';
import ButtonComponent from 'Components/Button/Button';
import SpinnerComponent from 'Components/Spinner/Spinner';
import Image from 'Utils/Image';
import { handle_correction_predicting, handle_start_predicting, handleGetPrintData } from '../Action/UserAction';
import ButtonSpinner from 'Components/Spinner/ButtonSpinner';
import Icons from 'Utils/Icons';
import PrintPage from './PrintPage';


const Userhome = () => {
  const dispatch = useDispatch();
  const { adminState, userState } = useCommonState();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const normalize = (str) => str?.toLowerCase().replace(/[\s_]+/g, '');
  const [modalType, setModalType] = useState("Single Phase");
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const phase = userState?.user_data?.phase;
  const hasPredictedData = !!userState?.predicted_data?.length;

  // Define start and end based on modal type
  // const isSinglePhase = modalType === "Single Phase ";
  // const isMultiPhase = modalType === "Multi Phase";

  // const isFinalPhase =
  //   (isSinglePhase && phase === "R_Phase_Lower_Direction") ||
  //   (isMultiPhase && phase === "B_Phase_Lower_Direction");

  const isFinalPhase =
    (modalType === "Single Phase" && phase === "R_Phase_Lower_Direction") ||
    (modalType === "Multi Phase" && phase === "B_Phase_Lower_Direction");

  const showNext =
    !isFinalPhase && hasPredictedData; // any phase before final with data

  const buttonLabel = showNext ? "Next" : "Done";

  const keyMap = {
    prediction_image: 'prediction_image_show_ui',
    upload_image: 'upload_image_show_ui'
  }

  const dataMap = {
    prediction_image: 'prediction_image',
    upload_image: 'upload_image',
    file: 'excel_file'
  }

  const uiMap = {
    prediction_image: keyMap.prediction_image,
    upload_image: keyMap.upload_image,
    file: 'files_show_ui'
  }

  useEffect(() => {
    dispatch(handle_get_dir())
  }, [])

  function upload_image(e, type) {
    const selectedFiles = Array.from(e.target.files);
    const isImageUpload = type === 'prediction_image' || type === 'upload_image';
    const uiKey = uiMap[type] || 'files_show_ui';
    const dataKey = dataMap[type] || 'excel_file';

    const existingUI = userState?.user_data?.[uiKey] || [];
    const existingFiles = Array.from(userState?.user_data?.[dataKey] || []);

    Promise.all(selectedFiles.map(readFile))
      .then((results) => {
        const newUI = [...existingUI, ...results];
        const allFiles = [...existingFiles, ...selectedFiles];

        dispatch(update_user_data({
          [uiKey]: newUI,
          [dataKey]: allFiles
        }));
      })
      .catch((error) => {
        const errorContext = isImageUpload ? 'image' : 'excel';
        console.error(`Error reading ${errorContext} files:`, error);
      })
  }

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          id: new ShortUniqueId({ length: 10 }),
          filename: file.name,
          filetype: file.type,
          fileimage: reader.result,
          datetime: file.lastModifiedDate.toLocaleString("en-IN"),
          filesize: filesizes(file.size),
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  }

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function DeleteSelectFile(id, type) {
    const uiKey = uiMap[type] || 'files_show_ui';
    const dataKey = dataMap[type] || 'excel_file';

    const existingUI = userState?.user_data?.[uiKey] || [];
    const existingFiles = userState?.user_data?.[dataKey] || [];

    // Step 1: Remove file from UI list
    const filteredUI = existingUI.filter((data) => data.id !== id);

    // Step 2: Build list of filenames remaining
    const remainingFilenames = filteredUI.map((data) => data.filename);

    // Step 3: Filter files by name (keeping only the ones still referenced)
    const filteredFiles = existingFiles.filter((file) =>
      remainingFilenames.includes(file.name)
    );

    // Step 4: Dispatch update
    dispatch(update_user_data({
      [uiKey]: filteredUI,
      [dataKey]: filteredFiles
    }));
  }

  function file_function(data, index, from) {
    const isStringType = typeof data === "string";

    if (isStringType) {
      const fileName = data?.split("/").pop();
      const isImage = fileName?.match(/\.(jpg|jpeg|png|gif|svg|bmp)$/i);
      return (
        <div className="file-atc-box w-100" key={index}>
          <div className="file-image">
            {isImage ?
              <img src={data} alt={fileName} />
              :
              <FaRegFile />
            }
          </div>
          <div className="file-detail row">
            <div className="col-9">
              <h6>{fileName}</h6>
            </div>
            <div className="file-actions col-3 text-end">
              <ButtonComponent
                type="button"
                className="file-action-btn w-100 text-danger"
                clickFunction={() => DeleteSelectFile(id, from)}
                buttonName={Icons?.Trash}
              />
            </div>
          </div>
        </div>
      );
    } else {
      const { id, filename, fileimage, datetime, filesize } = data;
      const isImage = filename?.match(/\.(jpg|jpeg|png|gif|svg|bmp)$/i);

      return (
        <div className="file-atc-box w-100" key={id || index}>
          <div className="file-image">
            {isImage ?
              <img src={fileimage} alt={filename} height="250rem" width="100%" />
              :
              <FaRegFile />
            }
          </div>
          <div className="file-detail row">
            <div className="col-12">
              <h6>{filename}</h6>
            </div>
            <div className="col-9">
              <p>
                <span>Size: {filesize}</span>,
                <span className="ps-1 ms-2">Modified: {datetime}</span>
              </p>
            </div>
            <div className="file-actions col-3 text-end">
              <ButtonComponent
                type="button"
                className="file-action-btn w-100 text-danger"
                clickFunction={() => DeleteSelectFile(id, from)}
                buttonName={Icons?.Trash}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  function matchedImage(filename) {
    return matchedImage = userState?.user_data?.prediction_image_show_ui?.find((img) => {
      const imgFilename = img?.filename;
      return normalize(imgFilename) === normalize(filename);
    })
  }

  function display_folders(folders) {
    return Array.isArray(folders) ? folders.flatMap(node => {
      const display_floder_path = `${userState?.user_data?.modal}/train/`

      if (node.type === 'folder') {
        if (node.path === display_floder_path) {
          return node;
        }
      }

      if (node.type === 'folder') return display_folders(node.children || []);
      return [];
    }) : []
  }

  function handleCorrectPrediction() {
    let class_name = `${userState?.user_data?.modal}/train/${userState?.user_data?.selected_folder}`
    const send_image = Array.from(userState?.user_data?.prediction_image || [])

    dispatch(handle_correction_predicting({ class_name, send_image, phase: userState?.user_data?.phase || '' }))
  }

  function handleprint() {
    if (userState?.user_data?.modal) {
      dispatch(handleGetPrintData({ model: userState?.user_data?.modal || '' }));
      setShowPrintModal(true);
    } else {
      dispatch(get_printing_data({ type: 'failure', message: 'Model name required' }))
    }
  }

  return (
    <div className="container pt-4">
      <div className="w-100 mb-3 ps-2">
        <img src={Image?.CompanyLogo} alt="Emr" className='Emr-logo' />
      </div>
      <hr />

      {adminState?.dir_glow ?
        <div className="row align-items-center justify-content-center" style={{ height: "49rem" }}>
          <div className="col-6 text-center">
            <SpinnerComponent variant="primary" />
            <p className='mt-1'>Collecting available models..</p>
          </div>
        </div>
        :
        <div className="row g-4">
          {/* Left Card */}
          <div className="col-12 col-md-6 user_home_height">
            <Card className="rounded-4 border-0 shadow-sm h-100">
              <Card.Header className="bg-transparent pt-3">
                <h5 className="heading-1 d-flex align-items-center gap-2">Compare Image</h5>
              </Card.Header>
              <Card.Body className="overflow-auto" style={{ maxHeight: '70vh' }}>
                <Form.Group className="mb-3">
                  <h6 className="form-label heading-2">Image Model Ref</h6>
                  <Form.Select
                    value={userState?.user_data?.modal || ''}
                    onChange={(e) => dispatch(update_user_data({ modal: e.target.value }))}
                  >
                    <option value="">Select a Model</option>
                    {adminState?.dir_data?.map((item, index) => (
                      item.status === 'trained' && <option key={index} value={item?.name}>{item?.name}</option>
                    ))}
                  </Form.Select>

                  <Form.Group className="mb-2">
                    <div className="row mt-2">
                      <h6 className="heading-2 mb-2">Select Phase Type</h6>
                      {["Single Phase", "Multi Phase"].map((item, ind) => (
                        <div className="col-auto" key={ind}>
                          <div className="form-check form-check-inline">
                            <input
                              type="radio"
                              name="modal_type"
                              value={item}
                              id={item + ind}
                              className="form-check-input"
                              onChange={() => setModalType(item)}
                              checked={modalType === item}
                            />
                            <label className="form-check-label" htmlFor={item + ind}>
                              {item === "Single Phase"
                                ? "Single Phase Transformer"
                                : "MultiPhase Transformer"}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>

                  </Form.Group>
                  <Form.Group className="mb-3">
                    <h6 className="form-label heading-2">Phase</h6>
                    <Form.Select
                      value={userState?.user_data?.phase || ''}
                      onChange={(e) => dispatch(update_user_data({ phase: e.target.value }))}
                    >
                      {(userState?.phases || [])
                        .filter((item) => {
                          if (modalType === "Single Phase") {
                            return item?.startsWith("R Phase");
                          }
                          return true
                        })
                        .map((item, index) => (
                          <option
                            key={index}
                            value={item?.replaceAll(" ", "_")}
                            disabled={item !== userState?.user_data?.phase}
                          >
                            {item}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>

                </Form.Group>
                <Form.Group className="mb-4">
                  <h6 className="form-label heading-2">Upload Graph  Image</h6>
                  {
                    !userState?.user_data?.prediction_image_show_ui?.length &&
                    <div className="border rounded position-relative text-center p-3 d-flex flex-column justify-content-center align-items-center" style={{ borderStyle: 'dashed', height: '100px' }}>
                      <input
                        type="file"
                        accept="image/*"
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                        onChange={(e) => upload_image(e, "prediction_image")}
                      />
                      <div className='mb-2'>{Icons.Browse}</div>
                      <p className="text-muted mb-0 text-center small">Drop file or Browse</p>
                    </div>
                  }
                </Form.Group>
                {userState?.user_data?.prediction_image_show_ui?.map((data, index) => file_function(data, index, "prediction_image"))}

                <Form.Group className="mb-3">
                  <h6 className="form-label heading-2">Upload Transition Time</h6>
                  {
                    !userState?.user_data?.files_show_ui?.length &&
                    <div className="border rounded position-relative text-center p-3 d-flex flex-column justify-content-center align-items-center" style={{ borderStyle: 'dashed', height: '100px' }}>
                      <input
                        type="file"
                        accept=".ods, .xls, .xlsx"
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                        onChange={(e) => upload_image(e, "file")}
                      />
                      <div className='mb-2'>{Icons.Browse}</div>
                      <p className="text-muted mb-0 text-center small">Drop file or Browse (Format: ods, xls)</p>
                    </div>
                  }
                </Form.Group>
                {userState?.user_data?.files_show_ui?.map((data, index) => file_function(data, index, "file"))}

                <Form.Group className="mb-4">
                  <h6 className="form-label heading-2">Upload Motor Current profile Image</h6>
                  {
                    !userState?.user_data?.upload_image_show_ui?.length &&
                    <div className="border rounded position-relative text-center p-3 d-flex flex-column justify-content-center align-items-center" style={{ borderStyle: 'dashed', height: '100px' }}>
                      <input
                        type="file"
                        accept="image/*"
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                        onChange={(e) => upload_image(e, "upload_image")}
                      />
                      <div className='mb-2'>{Icons.Browse}</div>
                      <p className="text-muted mb-0 text-center small">Drop file or Browse</p>
                    </div>
                  }
                </Form.Group>
                {userState?.user_data?.upload_image_show_ui?.map((data, index) => file_function(data, index, "upload_image"))}
              </Card.Body>

              <Card.Footer className="bg-transparent d-flex flex-wrap justify-content-end gap-2">
                <ButtonComponent
                  buttonName="Predict"
                  className="btn-primary"
                  clickFunction={() => dispatch(handle_start_predicting(userState?.user_data))}
                />
              </Card.Footer>
            </Card>
          </div>

          {/* Right Card */}
          <div className="col-12 col-md-6 user_home_height">
            <Card className="rounded-4 border-0 shadow-sm h-100">
              <Card.Header className="bg-transparent pt-3">
                <h5 className="heading-1 d-flex align-items-center gap-2">Image Pattern Results</h5>
              </Card.Header>
              <Card.Body className="overflow-auto" style={{ maxHeight: '70vh' }}>
                {userState?.is_predicting ?
                  <div className='h-100 row align-items-center justify-content-center'>
                    <div className="col-8 text-center">
                      <SpinnerComponent />
                      <p className="mt-2">Predicting...</p>
                    </div>
                  </div>
                  :
                  !userState?.predicted_data?.length ?
                    <div className="text-muted h-100 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '500px' }}>
                      <img src={Image?.image_loader} alt="Upload Placeholder" style={{ maxHeight: 150 }} />
                      <p className="mt-2">No image loaded yet</p>
                    </div>
                    :
                    // <div className='col-12'>
                    //   {userState?.predicted_data?.map((item, index) => (
                    //     <Fragment key={index}>
                    //       <div className="col-12 text-center mb-3">
                    //         <img src={matchedImage(item?.filename)?.fileimage || ''} alt="prediction response" className="img-fluid rounded" />
                    //       </div>
                    //       {Object.entries(item).map(([key, value]) => (
                    //         key !== "corrected" && (
                    //           <div className="mb-3" key={key}>
                    //             <h6 className="heading-2">{key}</h6>
                    //             <div className="p-2">
                    //               {key === 'output' ?
                    //                 <textarea rows={8} className="form-control custom-textarea w-100 pe-none">{value}</textarea>
                    //                 :
                    //                 <p>{key === 'predicted_class' ? value?.split("/").filter(Boolean).pop() : value}</p>
                    //               }
                    //             </div>

                    //           </div>
                    //         )
                    //       ))}
                    //     </Fragment>
                    //   ))}
                    // </div>
                    <div className='col-12'>
                      {userState?.predicted_data?.map((item, index) => (
                        <Fragment key={index}>
                          <div className="col-12 text-center mb-3">
                            <img src={matchedImage(item?.filename)?.fileimage || ''} alt="prediction response" className="img-fluid rounded" />
                          </div>

                          {/* Define the desired order of keys */}
                          {['predicted_class', 'confidence', 'transition', 'output', 'filename'].map((key) => (
                            item[key] !== undefined && key !== "corrected" && (
                              <div className="mb-3" key={key}>
                                <h6 className="heading-2">{key}</h6>
                                <div className="p-2">
                                  {key === 'output' ? (
                                    <textarea
                                      rows={8}
                                      className="form-control custom-textarea w-100 pe-none"
                                      readOnly
                                      value={item[key]}
                                    />
                                  ) : (
                                    <p>
                                      {key === 'predicted_class'
                                        ? item[key]?.split("/").filter(Boolean).pop()
                                        : item[key]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )
                          ))}
                        </Fragment>
                      ))}
                    </div>

                }
              </Card.Body>

              {!userState?.is_predicting && userState?.predicted_data && (
                <Card.Footer className="bg-transparent d-flex flex-wrap justify-content-end gap-2">
                  <ButtonComponent
                    buttonName="Add to image library"
                    className="btn-primary"
                    clickFunction={() => dispatch(update_user_data({ correct_prediction_modal: true, folder_type: "Use Class" }))}
                  />


                  {/* { userState?.user_data?.phase === "B_Phase_Lower_Direction" && userState?.predicted_data?.length ?
                  <ButtonComponent
                    buttonName="Print Result"
                    className="btn-primary"
                    clickFunction={handleprint}
                  />
                   :
                      null
                  }  */}
                  {(
                    (modalType === "Single Phase" &&
                      userState?.user_data?.phase === "R_Phase_Lower_Direction" &&
                      userState?.predicted_data?.length > 0) ||
                    (modalType === "Multi Phase" &&
                      userState?.user_data?.phase === "B_Phase_Lower_Direction" &&
                      userState?.predicted_data?.length > 0)
                  ) && (
                      <ButtonComponent
                        buttonName="Print Result"
                        className="btn-primary"
                        clickFunction={handleprint}
                      />
                    )}

                  <PrintPage
                    show={showPrintModal}
                    onHide={() => setShowPrintModal(false)}
                    userState={userState}
                  />
                  {/* 
                  <ButtonComponent
                    buttonName={buttonLabel}
                    className="btn-primary"
                    clickFunction={() => {
                      if (isFinalPhase && hasPredictedData) {
                        // Show confirmation modal before final action
                        setShowConfirmModal(true);
                      } else {
                        // Normal flow
                        dispatch(predicted_next_data({}));
                      }
                    }}
                    btnDisable={!hasPredictedData}
                  /> */}
                  <ButtonComponent
                    buttonName={buttonLabel}
                    className="btn-primary"
                    clickFunction={() => {
                      if (isFinalPhase && hasPredictedData) {
                        setShowConfirmModal(true); // Show confirm modal on Done
                      } else {
                        dispatch(predicted_next_data({})); // Normal Next
                      }
                    }}
                    btnDisable={!hasPredictedData}
                  />

                </Card.Footer>
              )}
            </Card>
          </div>
        </div>
      }

      {/* Modal */}
      <Modal
        show={userState?.user_data?.correct_prediction_modal}
        centered
        onHide={() => dispatch(update_user_data({ correct_prediction_modal: false, selected_folder: '' }))}>
        <Modal.Header closeButton>
          <h5 className="modal-title">Select Class Name</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="row gy-3 px-2">
            {['Create Class', 'Use Class'].map((item, ind) => (
              <div className="col-6" key={ind}>
                <input
                  type="radio"
                  name="modal"
                  value={item}
                  id={item + ind}
                  onChange={(e) => dispatch(update_user_data({ folder_type: e.target.value }))}
                  checked={item === userState?.user_data?.folder_type}
                />
                <label htmlFor={item + ind} className="form-label ps-2">{item}</label>
              </div>
            ))}

            {userState?.user_data?.folder_type === 'Create Class' ?
              <div className="col-12">
                <label htmlFor='add_new_folder' className="form-label ps-2">Add New Folder</label>
                <input
                  type="text"
                  id='add_new_folder'
                  className="form-control"
                  placeholder="Add New Image Model Ref"
                  value={userState?.user_data?.selected_folder}
                  onChange={(e) => dispatch(update_user_data({ selected_folder: e.target.value }))}
                />
              </div>
              :
              <div className="col-12">
                <h6>Existing folders</h6>
                {display_folders(adminState?.dir_data)[0]?.children?.map((item, index) => (
                  <div className="form-check" key={index}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="classOptions"
                      id={item?.name}
                      value={item?.name}
                      defaultChecked={item?.name === userState?.user_data?.selected_folder}
                      onChange={(e) => dispatch(update_user_data({ selected_folder: e.target.value }))}
                    />
                    <label className="form-check-label" htmlFor={item?.name}>{item?.name}</label>
                  </div>
                ))}
              </div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between flex-wrap">
          <div className="col p-1">
            <ButtonComponent
              buttonName="Cancel"
              className="btn-secondary w-100 mb-2 mb-sm-0 me-sm-2"
              clickFunction={() => dispatch(update_user_data({ correct_prediction_modal: false, selected_folder: '' }))}
            />
          </div>

          <div className="col p-1">
            {userState?.correction_predicting_glow ?
              <ButtonSpinner title="Submitting" spinner_width_height="1.1rem" className="ButtonSpinner w-100" />
              :
              <ButtonComponent
                buttonName="Submit"
                className="btn-primary w-100"
                clickFunction={handleCorrectPrediction}
              />
            }
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Final Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to complete and clear all data?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              dispatch(predicted_next_data({ clear_all_data: true }));
              setShowConfirmModal(false);
            }}
          >
            Yes, Done
          </Button>
        </Modal.Footer>
      </Modal>




    </div >
  );
};

export default Userhome; 
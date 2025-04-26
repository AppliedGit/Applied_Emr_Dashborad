import React, { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Form, Modal } from 'react-bootstrap';
import { FaRegFile } from 'react-icons/fa';
import useCommonState from 'ResuableFunctions/CustomHooks';
import { handle_get_dir } from 'Views/Admin/Action/AdminAction';
import { predicted_next_data, update_user_data } from '../Slice/User_slice';
import ShortUniqueId from 'short-unique-id';
import ButtonComponent from 'Components/Button/Button';
import SpinnerComponent from 'Components/Spinner/Spinner';
import Image from 'Utils/Image';
import { handle_correction_predicting, handle_start_predicting } from '../Action/UserAction';
import Img from 'Components/Img/Img';
import ButtonSpinner from 'Components/Spinner/ButtonSpinner';
import Icons from 'Utils/Icons';

const Userhome = () => {
  const dispatch = useDispatch();
  const { adminState, userState } = useCommonState();
  const normalize = (str) => str?.toLowerCase().replace(/[\s_]+/g, '');

  useEffect(() => {
    dispatch(handle_get_dir())
  }, [])

  function upload_image(e, type) {
    const selectedFiles = Array.from(e.target.files);

    if (type === "image") {
      const existingImageUI = userState?.user_data?.image_show_ui || [];
      const existingImageFiles = Array.from(userState?.user_data?.images || []);
      let newImageUI = [];

      Promise.all(selectedFiles.map((file) => readFile(file)))
        .then((results) => {
          newImageUI = [...existingImageUI, ...results];
          const allImageFiles = [...existingImageFiles, ...selectedFiles];

          dispatch(update_user_data({
            image_show_ui: newImageUI,
            images: allImageFiles
          }));
        })
        .catch((error) => console.error('Error reading image files:', error));

    } else {
      const existingFileUI = userState?.user_data?.files_show_ui || [];
      const existingExcelFiles = Array.from(userState?.user_data?.excel_file || []);
      let newFileUI = [];

      Promise.all(selectedFiles.map((file) => readFile(file)))
        .then((results) => {
          newFileUI = [...existingFileUI, ...results];
          const allExcelFiles = [...existingExcelFiles, ...selectedFiles];

          dispatch(update_user_data({
            files_show_ui: newFileUI,
            excel_file: allExcelFiles
          }));
        })
        .catch((error) => console.error('Error reading excel files:', error));
    }
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
    });
  };

  const filesizes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  function DeleteSelectFile(id, is_image) {
    if (is_image) {
      const result = userState?.user_data?.image_show_ui.filter((data) => data.id !== id);
      const overallFile = result.map((data) => data.filename);
      var newImages = [];
      for (let i = 0; i < userState?.user_data?.images.length; i++) {
        if (overallFile.includes(userState?.user_data?.images[i].name)) {
          newImages.push(userState?.user_data?.images[i]);
        }
      }
      dispatch(update_user_data({ image_show_ui: result, images: newImages }));
    }
    else {
      const result = userState?.user_data?.files_show_ui.filter((data) => data.id !== id);
      const overallFile = result.map((data) => data.filename);
      var newFiles = [];
      for (let i = 0; i < userState?.user_data?.excel_file.length; i++) {
        if (overallFile.includes(userState?.user_data?.excel_file[i].name)) {
          newFiles.push(userState?.user_data?.excel_file[i]);
        }
      }
      dispatch(update_user_data({ files_show_ui: result, excel_file: newFiles }));
    }
  };

  function file_function(data, index) {
    const isStringType = typeof data === "string";

    if (isStringType) {
      const fileName = data?.split("/").pop();
      const isImage = fileName?.match(/\.(jpg|jpeg|png|gif|svg)$/i);

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
                clickFunction={() => DeleteSelectFile(id)}
                buttonName="Delete"
              />
            </div>
          </div>
        </div>
      );
    } else {
      const { id, filename, fileimage, datetime, filesize } = data;
      const isImage = filename?.match(/\.(jpg|jpeg|png|gif|svg)$/i);

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
                clickFunction={() => DeleteSelectFile(id, isImage)}
                buttonName="Delete"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  function matchedImage(filename) {
    const matchedImage = userState?.user_data?.image_show_ui?.find((img) => {
      const imgFilename = img?.filename;
      return normalize(imgFilename) === normalize(filename);
    });

    return matchedImage
  };

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
  };

  function handleCorrectPrediction() {
    let class_name = `${userState?.user_data?.modal}/train/${userState?.user_data?.selected_folder}`

    const send_image = Array.from(userState?.user_data?.images || [])?.find((img) => {
      const imgFilename = img?.name;
      return normalize(imgFilename) === normalize(userState?.predicted_single_data[0]?.filename || '');
    });

    dispatch(handle_correction_predicting({ class_name, send_image }))
  };

  return (
    <div className="container py-4">
      <h5 className="heading-1 mb-4 d-flex align-items-center gap-2">Compare Image</h5>


      {adminState?.dir_glow ?
        <div className="row align-items-center justify-content-center" style={{ height: "45rem" }}>
          <div className="col-6 text-center">
            <SpinnerComponent variant="primary" />
            <p className='mt-1'>Collecting available models..</p>
          </div>
        </div>
        :
        <div className="row g-4 align-items-stretch">
          <div className="col-sm-12 col-md-6 user_home_height">
            <Card className="rounded-4 border-0 shadow-sm h-100">
              <Card.Header className="bg-transparent pt-3">
                <Card.Title>Upload Inputs</Card.Title>
              </Card.Header>
              <Card.Body style={{ height: '100%', overflowY: 'scroll' }}>
                <Form.Group className="mb-3">
                  <h6 className="form-label heading-2">Image Model Ref</h6>
                  <Form.Select
                    value={userState?.user_data?.modal || ''}
                    onChange={(e) => dispatch(update_user_data({ modal: e.target.value }))}
                  >
                    <option value="">Select a Model</option>
                    {
                      adminState?.dir_glow ?
                        null
                        :
                        adminState?.dir_data?.length ?
                          adminState?.dir_data?.map((item, index) => (
                            item.status === 'y' ?
                              <option value={item?.name} key={index}>{item?.name || ''}</option>
                              :
                              null
                          ))
                          :
                          null
                    }
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <h6 className="form-label heading-2">Upload Image</h6>
                  <div className="border rounded position-relative text-center p-4 mb-3"
                    style={{ borderStyle: 'dashed', height: '100px' }} >
                    <input
                      type="file"
                      accept="image/*"
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                      onChange={(e) => upload_image(e, "image")}
                      multiple
                    />
                    <div className="d-flex align-items-center h-100">
                      <div className='col-2'>{Icons.Browse}</div>
                      <p className="text-muted mb-0">Drop file or Browse</p>
                    </div>
                  </div>
                </Form.Group>
                {userState?.user_data?.image_show_ui?.map((data, index) => {
                  return file_function(data, index)
                })}

                <Form.Group className="mb-3">
                  <h6 className="form-label heading-2">Upload CSV File</h6>
                  <div className="border rounded position-relative text-center p-4 mb-3"
                    style={{ borderStyle: 'dashed', height: '100px' }} >
                    <input
                      type="file"
                      accept=".ods, .xls, .xlsx"
                      className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                      onChange={(e) => upload_image(e, "file")}
                      multiple
                    />
                    <div className="d-flex align-items-center h-100">
                      <div className='col-2'>
                        {Icons.Browse}
                      </div>
                      <div className="col-10 text-start">
                        <p className="text-muted mb-0">Drop file or Browse</p>
                        <p className="text-secondary mb-0">Format: ods, xls</p>
                      </div>
                    </div>
                  </div>
                </Form.Group>
                {userState?.user_data?.files_show_ui?.map((data, index) => {
                  return file_function(data, index)
                })}
              </Card.Body>

              <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
                <ButtonComponent
                  buttonName="Next"
                  className="btn-primary"
                  clickFunction={() => dispatch(handle_start_predicting(userState?.user_data))}
                  btnDisable={userState?.is_predicting}
                />
              </Card.Footer>
            </Card>
          </div>

          <div className="col-sm-12 col-md-6 user_home_height">
            <Card className="rounded-4 border-0 shadow-sm h-100">
              <Card.Header className="bg-transparent pt-3">
                <Card.Title>Image Result</Card.Title>
              </Card.Header>

              <Card.Body style={{ height: '100%', overflowY: 'scroll' }}>
                {userState?.is_predicting ?
                  <div className='h-100 row align-items-center justify-content-center'>
                    <div className="col-8 text-center">
                      <SpinnerComponent />
                      <p className="mt-2">Predicting...</p>
                    </div>
                  </div>
                  :
                  !userState?.predicted_data ?
                    <div className="text-muted h-100 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '500px' }}>
                      <img src={Image?.image_loader} alt="Upload Placeholder" style={{ maxHeight: 150 }} />
                      <p className="mt-2">No image loaded yet</p>
                    </div>
                    :
                    <div className='col-12'>
                      {
                        userState?.predicted_single_data?.map((item, index) => (
                          <Fragment>
                            <div className="col-12 text-center mb-3">
                              <Img src={matchedImage(item?.filename)?.fileimage || ''} alt="prediction response" width="90%" height="280rem" />
                            </div>

                            {Object.entries(item).map(([key, value]) => {
                              if (key !== "corrected") {
                                switch (key) {
                                  case "output":
                                    return <div className="mb-3">
                                      <h6 className="heading-2">{key}</h6>
                                      <div className="p-2">
                                        <textarea cols={10} rows={8} className="form-control pe-none">{value || ''}</textarea>
                                      </div>
                                    </div>

                                  default:
                                    return <div className="mb-3">
                                      <h6 className="heading-2">{key}</h6>
                                      <div className="p-2">
                                        <p>{value || ''}</p>
                                      </div>
                                    </div>
                                }
                              }
                            })}
                          </Fragment>
                        ))
                      }
                    </div>
                }
              </Card.Body>

              {!userState?.is_predicting && userState.predicted_data ?
                <Card.Footer className="bg-transparent d-flex justify-content-end gap-2">
                  <ButtonComponent
                    buttonName="No"
                    className="btn-primary"
                    clickFunction={() => dispatch(update_user_data({ correct_prediction_modal: true }))}
                  />

                  <ButtonComponent
                    buttonName="Yes"
                    className="btn-primary"
                    clickFunction={() => dispatch(predicted_next_data())}
                    btnDisable={userState?.predicted_data?.length <= 1}
                  />
                </Card.Footer>
                :
                null
              }
            </Card>
          </div>
        </div>
      }

      {/* Modal */}
      <Modal show={userState?.user_data?.correct_prediction_modal} centered onHide={() => dispatch(update_user_data({ correct_prediction_modal: false }))}>
        <Modal.Header closeButton>
          <h5 className="modal-title">Select Class Name</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-2 p-3">
            <div className="col-12 row">
              {["Create new Folder", "Use Folder"]?.map((item, ind) =>
                <div className="col" key={ind}>
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
              )}
            </div>
          </div>

          <div className="col-12 ps-3">
            {userState?.user_data?.folder_type === "Create new Folder" ?
              <Fragment>
                <label htmlFor='add_new_folder' className="form-label ps-2">Add New Folder</label>
                <input
                  type="text"
                  id='add_new_folder'
                  className="form-control"
                  placeholder="Add New Image Model Ref"
                  value={userState?.user_data?.selected_folder}
                  onChange={(e) => dispatch(update_user_data({ selected_folder: e.target.value }))}
                />
              </Fragment>
              :
              <Fragment>
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
              </Fragment>
            }
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div className="col p-1">
            <ButtonComponent
              buttonName="Cancel"
              className="btn-secondary w-100"
              clickFunction={() => dispatch(update_user_data({ correct_prediction_modal: false }))}
            />
          </div>
          <div className="col p-1">
            {
              userState?.correction_predicting_glow ?
                <ButtonSpinner title="Submiting" spinner_width_height="1.1rem" />
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
    </div>
  );
};

export default Userhome; 
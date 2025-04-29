import ButtonComponent from "Components/Button/Button";
import useCommonState, { useCustomNavigate, useDispatch } from "ResuableFunctions/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import { resetModalBox } from "Views/Common/Slice/Common_slice";
import { handle_delete_data, handle_train_modal } from "Views/Admin/Action/AdminAction";
import CircularProgressBar from "Components/Progress/CircularProgressBar";
import { useEffect, useRef } from "react";
import ButtonSpinner from "Components/Spinner/ButtonSpinner";

export function OverallModel() {
    const { commonState, adminState } = useCommonState();
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [adminState?.traing_command_prompt]);


    function modalHeaderFun() {
        switch (commonState?.modal_from) {
            case "Home":
                switch (commonState?.modal_type) {
                    case "":
                        return <h5>Train Model</h5>

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    function dynamicInput() {
        let funBy = null

    }

    function modalBodyFun() {
        switch (commonState?.modal_from) {
            case "Home":
                switch (commonState?.modal_type) {
                    case "train_confiramtion":
                        return <div className="col-12 row py-5">
                            <div className="col-12">
                                <h5 className="text-center">Train Model</h5>
                                <p className="text-center">{`Are you sure you want to train this (${adminState?.train_path}) model?`}</p>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <ButtonComponent
                                    type="button"
                                    className="btn btn-primary px-5"
                                    buttonName="No"
                                    clickFunction={() => dispatch(resetModalBox())}
                                />
                                {
                                    adminState?.train_model_spinner ?
                                        <ButtonSpinner title="training..." spinner_width_height="1.5rem" className="ms-3 btn-primary" />
                                        :
                                        <ButtonComponent
                                            type="button"
                                            className="btn btn-primary ms-3 px-5"
                                            buttonName="Yes"
                                            clickFunction={() => dispatch(handle_train_modal({ base_path: adminState?.train_path }))}
                                        />
                                }
                            </div>
                        </div>

                    case "delete_confirmation":
                        return <div className="col-12 row py-5">
                            <div className="col-12">
                                <h5 className="text-center">{`Are you sure you want to Delete`}</h5>
                                <p className="text-center my-5">{adminState?.deletion_data?.type} - {adminState?.deletion_data?.name}</p>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <ButtonComponent
                                    type="button"
                                    className="btn btn-primary px-5"
                                    buttonName="No"
                                    clickFunction={() => dispatch(resetModalBox())}
                                />
                                {
                                    adminState?.delete_modal_spinner ?
                                        <ButtonSpinner title="Deleting..." spinner_width_height="1.5rem" className="ms-3 btn-primary" />
                                        :
                                        <ButtonComponent
                                            type="button"
                                            className="btn btn-primary ms-3 px-5"
                                            buttonName="Yes"
                                            clickFunction={() => dispatch(handle_delete_data({ path: adminState?.deletion_data?.path, from: adminState?.deletion_data?.from }))}
                                        />
                                }
                            </div>
                        </div>

                    case "start_train":
                        return <div className="w-100">
                            <div className="w-100 row">
                                <div className="col-9">
                                    <h5 className="">Training Model</h5>
                                    <p className="">{`Training model (${adminState?.train_path}) in progress...`}</p>
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                    <CircularProgressBar percentage={adminState?.training_percentage || 0} size={80} />
                                </div>
                            </div>

                            <div className="w-100 row mt-3">
                                <div className="train_command_prompt" ref={containerRef}>
                                    {adminState?.traing_command_prompt?.map((item, index) => (
                                        <div key={index} className="w-100 mb-2">
                                            {JSON.stringify(item)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-100 d-flex justify-content-center mt-3">
                                <ButtonComponent
                                    type="button"
                                    className="btn btn-primary px-5 col-10"
                                    buttonName="Close"
                                    clickFunction={() => dispatch(resetModalBox())}
                                />
                            </div>
                        </div>

                    default:
                        break;
                }
        }
    }

    function modalFooterFun() {
        switch (commonState?.modal_from) {
            case "":
                switch (commonState?.modal_type) {
                    case "":
                        break

                    default:
                        break;
                }

            default:
                break;
        }
    }

    return (
        <ModalComponent
            show={commonState?.modalShow}
            modalSize={commonState?.moalSize}
            modalCentered={true}
            modalCloseButton={commonState?.modal_close_btn}
            showModalHeader={true}
            modalHeaderClassname="border-0"
            modalHeader={modalHeaderFun()}
            modalBodyClassname="py-2"
            modalBody={<div className='d-flex flex-wrap p-3 py-0'>{modalBodyFun()}</div>}
            showModalFooter={true}
            modalFooterClassname="border-0"
            modalFooter={modalFooterFun()}
            modalClassname={["lg", "xl"].includes(commonState?.moalSize) ? "model_height_lg" : ''}
        />
    )
}
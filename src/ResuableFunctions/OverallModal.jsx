import ButtonComponent from "Components/Button/Button";
import { useCustomNavigate, useDispatch } from "ResuableFunctions/CustomHooks";
import ModalComponent from "Components/Modal/Modal";
import SpinnerComponent from "Components/Spinner/Spinner";
import { useSelector } from "react-redux";
import Icons from "Utils/Icons";
import { resetModalBox, updateModalShow } from "Views/Common/Slice/Common_slice"; 
import Img from "Components/Img/Img";
import Image from "Utils/Image";

export function OverallModel() {
    const { commonState, interviewState } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useCustomNavigate();

    function modalHeaderFun() {
        switch (commonState?.modal_from) {
            case "interview_candidate":
                switch (commonState?.modal_type) {
                    case "test_completed":
                        // return <h6 className='mb-0'>Test completed</h6>;
                        return

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
            case "":
                switch (commonState?.modal_type) {
                    case "":
                         break

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
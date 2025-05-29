import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PrintableReport from './PrintableReport';
import Images from "Utils/Image"



function ReportModal({ show, onHide, indexData, Image }) {
    const componentRef = useRef();

    function handlePrint() {
        const inputs = document.getElementsByTagName('input');

        for (let input of inputs) {
            input.classList.add('border-0');
        }

        window.onafterprint = function () {
            for (let input of inputs) {
                input.classList.remove('border-0');
            }
        };

        window.print();
    }

    return (
        <>
            <Modal show={show} fullscreen onHide={onHide} centered>
                <Modal.Header >
                    <div className="w-100 d-flex justify-content-between align-items-center">
                        <img src={Images?.CompanyLogo} alt="Logo" className="Emr-logo" style={{ maxHeight: '35px' }} />
                        <img src={Images?.Easun} alt="Easun" className="Easun_mr" style={{ maxHeight: '50px' }} />
                    </div>
                </Modal.Header>
                <Modal.Body>

                    <div className="d-print-block scrollable" >
                        <PrintableReport ref={componentRef} indexData={indexData} Image={Image} />
                    </div>
                    {/* <div className="d-print-none scrollable">
                        <PrintableReport ref={componentRef} indexData={indexData} Image={Image} />
                    </div> */}
                </Modal.Body>
                <Modal.Footer className="d-print-none">
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="primary" className="d-print-none " onClick={handlePrint}>Print</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ReportModal;




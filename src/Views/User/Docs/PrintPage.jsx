import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PrintableReport from './PrintableReport';
import Images from "Utils/Image"

function ReportModal({ show, onHide, indexData, Image }) {
    const componentRef = useRef();

    function handlePrint() {
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
                <Modal.Body id="modal-content">
                    <div className="d-print-block scrollable scrollable" >
                        <PrintableReport ref={componentRef} indexData={indexData} Image={Image} />
                    </div>
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




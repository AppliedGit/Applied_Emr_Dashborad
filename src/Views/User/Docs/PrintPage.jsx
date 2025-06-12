import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PrintableReport from './PrintableReport';

function ReportModal({ show, onHide, indexData, Image }) {

    function handlePrint() {
        window.print();
    }

    return (
        <>
            <Modal show={show} fullscreen onHide={onHide} centered>
                <Modal.Body  id="modal-content" className='py-0'>
                    <div className="d-print-block scrollable scrollable" >
                        <PrintableReport indexData={indexData} Image={Image} />
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



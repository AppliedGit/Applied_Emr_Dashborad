import React, { Fragment, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PrintableReport from './PrintableReport';
import SpinnerComponent from 'Components/Spinner/Spinner';

function ReportModal({ show, onHide, indexData, Image, userState }) {
    function handlePrint() {
        window.print();
    }

    return (
        <>
            <Modal show={show} fullscreen onHide={onHide} centered>
                <Modal.Body id="modal-content" className='py-0'>
                    <div className="d-print-block scrollable scrollable" >
                        {
                            userState?.getting_print_data_glow ?
                                <Fragment>
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                                        <div className="col-5 text-center">
                                            <SpinnerComponent />
                                            <p className='w-100 mt-2'>Collecting Report data</p>
                                        </div>
                                    </div>
                                </Fragment>
                                :
                                <PrintableReport indexData={indexData} Image={Image} />
                        }
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



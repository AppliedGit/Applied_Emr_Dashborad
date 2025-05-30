import React, { forwardRef } from 'react';
import Image from 'Utils/Image';

const PrintableReport = forwardRef(
    (
        {
            indexData = [
                { slNo: 1, title: 'Transformer and OLTC Specification', pageNo: 3 },
                { slNo: 2, title: 'DCRM Procedure & Typical Graphs', pageNo: 4 },
                { slNo: 3, title: 'DCRM Graph Captured', pageNo: 5 },
                { slNo: 4, title: 'Observation & Conclusion', pageNo: 6 },
            ],
        },
        ref
    ) => {
        return (
            <div ref={ref} className="a4-print-page p-4">
                <div className="text-center mb-4">
                    <h2 className="heading-1">DCRM REPORT</h2>
                </div>

                <div className="container mt-4">
                    <form>
                        {[
                            { label: 'Customer Name', name: 'customerName' },
                            { label: 'Address', name: 'address' },
                            { label: 'Work Order Number', name: 'workOrderNumber' },
                            { label: 'Date of Test', name: 'dateOfTest', type: 'date' },
                        ].map(({ label, name, type = 'text' }, idx) => (
                            <div className="row mb-3" key={idx}>
                                <label className="col-sm-3 col-form-label">
                                    {label}<span className="text-danger"> *</span>
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type={type}
                                        className="form-control"
                                        name={name}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </form>
                </div>

                <div className="container mt-5 my-4">
                    <h4 className="text-center heading-1">INDEX</h4>
                    <table className="table table-bordered text-center align-middle border-danger">
                        <thead>
                            <tr className="custom-header">
                                <th><span>SL.NO</span></th>
                                <th><span>TITLE</span></th>
                                <th><span>PAGE NO.</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {indexData.map((item, index) => (
                                <tr key={index} className="border-danger">
                                    <td><strong>{item.slNo}</strong></td>
                                    <td>{item.title}</td>
                                    <td>{item.pageNo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="page-break container mt-5">
                    <h4 className="text-white text-center py-2 bg-danger">TRANSFORMER DETAILS</h4>
                    <form>
                        {[
                            { label: 'Manufacturer Name', placeholder: 'PRIME MEIDAN' },
                            { label: 'Power Rating', placeholder: 'MVA' },
                            { label: 'Voltage Rating', placeholder: '0 kV' },
                            { label: 'Vector Group', placeholder: 'YNyn0' },
                            { label: 'Number of Phases', placeholder: '0', type: 'number' },
                            { label: 'Rated Frequency', placeholder: '0 Hz' },
                            {
                                label: 'Serial Number',
                                placeholder: 'W01-107160089/G-01/13/16/00148',
                            },
                            { label: 'Special Remarks', placeholder: '-' },
                        ].map(({ label, placeholder, type = 'text' }, idx) => (
                            <div className="row mb-3" key={idx}>
                                <label className="col-sm-3 col-form-label">{label} <span className="text-danger">*</span></label>
                                <div className="col-sm-9">
                                    <input type={type} className="form-control" placeholder={placeholder} />
                                </div>
                            </div>
                        ))}
                    </form>
                </div>

                <div className="page-break container mt-5">
                    <h4 className="text-white text-center py-2 bg-danger">OLTC DETAILS</h4>
                    <form>
                        {[
                            { label: 'Manufacturer Name', placeholder: 'PRIME MEIDAN' },
                            { label: 'OLTC Serial Number', placeholder: 'OLTC Serial Number' },
                            {
                                label: 'OLTC Model (Resistive/Reactor/Vacuum/Oil Cooled)',
                                placeholder: 'OLTC Model',
                            },
                            {
                                label: 'OLTC Type Designation (If Known)',
                                placeholder: 'Example :( M III 500 Y 123/C 10.19.3W)',
                            },
                            { label: 'Special Remarks', placeholder: 'Special Remarks' },
                        ].map(({ label, placeholder }, idx) => (
                            <div className="row mb-3" key={idx}>
                                <label className="col-sm-3 col-form-label">{label} <span className="text-danger">*</span></label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" placeholder={placeholder} />
                                </div>
                            </div>
                        ))}
                    </form>
                </div>

                <div className="container mt-4 py-4">
                    <div className="row">
                        <div className="col-12">
                            <p className="full-width-text">
                                Dynamic Contact Resistance measurement (<strong>DCRM</strong>) is an
                                On-load tap-changer diagnostic method to understand the state of{" "}
                                <strong>OLTC</strong>. It is a simple and effective method in which
                                without opening <strong>OLTC</strong> or the Transformer, condition
                                of the <strong>OLTC</strong> can be monitored.{" "}
                                <strong>DCRM</strong> test involves specific test procedures,
                                thereby the test results are recorded systematically in the Computer
                                in the form of Current graphs.
                            </p>
                            <p className="full-width-text">
                                By analyzing the recorded graphs, <strong>OLTC</strong> healthiness
                                can be declared. The Current graph also indicates the location of
                                the fault in <strong>OLTC</strong> which reduces the overhauling
                                time and thereby reducing Transformer outage time.
                            </p>
                        </div>
                    </div>

                    <div className="row text-center">
                        <div className="col-12">
                            <h4 className="mt-4 heading-1">
                                Typical <strong className="text-danger">DCRM</strong> Current Graph
                            </h4>
                            <img
                                src={Image.graph1}
                                alt="Typical DCRM Current Graph"
                                className="img-fluid mx-auto d-block mb-3"
                            />
                            <img
                                src={Image.graph2}
                                alt="Inrush and Nominal Current Graph"
                                className="img-fluid mx-auto d-block"
                            />
                        </div>
                    </div>
                </div>

                <div className="container mt-3 text-center">
                    <h4 className="mb-4 heading-1">Diverter Switch Representation</h4>
                    <div className="image-box p-3 mb-5 bg-white rounded border-0 text-center">
                        <img
                            src={Image?.DiverterSwitch}
                            alt="Diverter Switch Representation"
                            className="img-fluid"
                        />
                    </div>
                </div>

                <div className="container mt-3 text-center">
                    <h4 className="mb-4 heading-1">DCRM – Current Graph Measuring Principle</h4>
                    <div className="image-box p-3 mb-5 bg-white rounded border-0 text-center">
                        <img
                            src={Image?.DCRMGraph}
                            alt="Diverter Switch Representation"
                            className="img-fluid"
                        />
                    </div>
                </div>

                <div className="container mt-3 text-center">
                    <h4 className="heading-1 mb-4">Diverter Switching Sequence</h4>
                    <div className="image-box p-3 mb-5 bg-white rounded border-0 text-center">
                        <img
                            src={Image?.SwitchingSequence}
                            alt="Diverter Switch Representation"
                            className="img-fluid"
                        />
                    </div>
                </div>

                <div className="container mt-3 text-center">
                    <h4 className="heading-1 mb-5">Current Graph Recorded</h4>
                    <div className="row justify-content-center g-3">
                        {[Image?.CurrentGraph1, Image?.CurrentGraph2, Image?.CurrentGraph3, Image?.CurrentGraph4].map((src, index) => (
                            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <img
                                    src={src}
                                    alt={`Current Graph ${index + 1}`}
                                    className="img-fluid no-outline no-border no-shadow"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
);

export default PrintableReport;

import React, { forwardRef, useState } from 'react';
import Image from 'Utils/Image';
import PrintableTable from './PrintableTable';
import PrintableTransformerTable from './PrintableTransformerTable';
import PrintableOltcTable from './PrintableOltcTable';
import PrintableEngineerDetails from './PrintableEngineerDetails';
import Chart from './Chart';
import useCommonState from 'ResuableFunctions/CustomHooks';

const editableStyle = {
    fontSize: "18px",
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
    minHeight: "40px",
};

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
       
        const { userState } = useCommonState();
        const [editablePhases, setEditablePhases] = useState(userState?.printing_data || []);

        const handleChange = (value, index, field, subfield = null) => {
            const updated = editablePhases.map((item, i) => {
                if (i !== index) return item;

                if (subfield && field === "result") {
                    return {
                        ...item,
                        result: [
                            {
                                ...item.result?.[0],
                                [subfield]: value,
                            },
                        ],
                    };
                }

                return {
                    ...item,
                    [field]: value,
                };
            });

            setEditablePhases(updated);
        };

        return (
            <div ref={ref} className="a4-print-page p-4 pt-0">
                <div className="w-100 d-flex justify-content-between align-items-center position-sticky top-0 bg-white py-4 print_page_header">
                    <img src={Image?.CompanyLogo} alt="Logo" className="Emr-logo" style={{ maxHeight: '35px' }} />
                    <img src={Image?.Easun} alt="Easun" className="Easun_mr" style={{ maxHeight: '50px' }} />
                </div>
                <div className='print-center-page'>
                    <h2 className="heading-1 text-center">DCRM REPORT</h2>
                    {/* <div className="text-center mb-4">
                        
                    </div> */}
                    <div className="mt-4">
                        <PrintableTable />
                    </div>

                    <div className="container mt-5 my-4">
                        <h4 className="text-center heading-1">INDEX</h4>
                        <table className="table table-bordered text-center align-middle ">
                            <thead>
                                <tr className="custom-header  ">
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
                </div>
                <div className="page-break mt-5">
                    <PrintableTransformerTable />
                </div>
                <div className="page-break mt-5">
                    <PrintableOltcTable />
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

                    <div className=" page-break row text-center">
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
                <div className="page-break container mt-3 text-center">
                    <h4 className="mb-4 heading-1">Diverter Switch Representation</h4>
                    <div className="image-box p-3 bg-white rounded border-0 text-center">
                        <img
                            src={Image?.DiverterSwitch}
                            alt="Diverter Switch Representation"
                            className="img-fluid"
                        />
                    </div>
                </div>
                <div className="container mt-3 text-center">
                    <h4 className="mb-4 heading-1">DCRM – Current Graph Measuring Principle</h4>
                    <div className="image-box p-3 bg-white rounded border-0 text-center">
                        <img
                            src={Image?.DCRMGraph}
                            alt="Diverter Switch Representation"
                            className="img-fluid"
                        />
                    </div>
                </div>
                <div className="container mt-3 text-center">
                    <h4 className="heading-1 mb-4">Diverter Switching Sequence</h4>
                    <div className="image-box p-3  bg-white rounded border-0 text-center">
                        <img
                            src={Image?.SwitchingSequence}
                            alt="Diverter Switch Representation"
                            className="img-fluid"
                        />
                    </div>
                </div>
                <div className="container mt-3 text-center">
                    <h4 className="heading-1 mb-2">Current Graph Recorded</h4>
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
                <div className="container mt-5">
                    {editablePhases?.prediction_report?.map((phase, idx) => (
                        <div key={idx} className="phase-block mb-5">
                            <h3 className="text-center heading-1 mb-4 text-danger">Phase Analysis</h3>
                            <h4
                                className="heading-1 text-center text-primary"
                                contentEditable
                                suppressContentEditableWarning
                                onInput={(e) => handleChange(e.target.innerText, idx, "phase")}
                            >
                                {/* {phase.phase .replace(/_Raise_/, "-Raise_")?.replaceAll("_"," ")} */}
                                {phase.phase?.replace(/_(Raise|Lower)_/, "-$1_")?.replaceAll("_", " ")}
                            </h4>

                            <div className="text-center my-3">
                                <img
                                    src={phase?.phase_image}
                                    alt={phase?.phase}
                                    className="img-fluid"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />
                            </div>

                            <h6 className="heading-1">Analysis:</h6>
                            <p
                                className="text-justify"
                                contentEditable
                                suppressContentEditableWarning
                                style={editableStyle}
                                onInput={(e) => {
                                    const updated = editablePhases.map((item, i) => {
                                        if (i !== idx) return item;

                                        return {
                                            ...item,
                                            result: [
                                                {
                                                    ...item.result?.[0],
                                                    transition: e.target.value,
                                                },
                                            ],
                                        };
                                    });

                                    setEditablePhases(updated);
                                }}
                            >
                                {phase.result[0]?.predicted_image_msg}
                            </p>


                            <h5 className="mt-4 heading-1 text-danger page-break">Motor Current Profile:</h5>
                            <div className="text-center my-3">
                                <img
                                    src={phase?.upload_image}
                                    alt="Motor Current Profile"
                                    className="img-fluid"
                                />
                            </div>

                            {/* <h6 className="heading-1">Analysis:</h6>
                            <textarea
                                className="form-control w-100 mb-2"
                                rows={6}
                                value={phase.result?.[0]?.output || ""}
                                onChange={(e) => {
                                    const updated = editablePhases.map((item, i) => {
                                        if (i === idx) {
                                            return {
                                                ...item,
                                                result: [
                                                    {
                                                        ...item.result?.[0],
                                                        output: e.target.value,
                                                    },
                                                ],
                                            };
                                        }
                                        return item;
                                    });
                                    setEditablePhases(updated);
                                }}
                                
                            /> */}

                            <h6 className="heading-1">Analysis:</h6>
                            <p
                                className="text-justify"
                                contentEditable
                                suppressContentEditableWarning
                                style={editableStyle}
                                onInput={(e) => {
                                    const updated = editablePhases.map((item, i) => {
                                        if (i !== idx) return item;

                                        return {
                                            ...item,
                                            result: [
                                                {
                                                    ...item.result?.[0],
                                                    transition: e.target.value,
                                                },
                                            ],
                                        };
                                    });

                                    setEditablePhases(updated);
                                }}
                            >
                                {phase.result[0]?.upload_img_msg}
                            </p>



                            <h5 className="mt-4 heading-1 text-danger page-break">Transition Time:</h5>
                            <div className="text-center my-3">
                                <Chart phase={phase?.graph_data} />
                            </div>

                            {phase.result?.[0]?.transition && (
                                <>
                                    <p className="heading-1 mt-2">Analysis :</p>
                                    <p
                                        className="text-justify"
                                        contentEditable
                                        suppressContentEditableWarning
                                        style={editableStyle}
                                        onInput={(e) => {
                                            const updated = [...editablePhases];
                                            updated[idx].result[0].transition = e.target.innertext;
                                            setEditablePhases(updated);
                                        }}
                                    >
                                        {phase.result[0].transition_time_msg}
                                    </p>
                                </>
                            )}

                            {/* Page break between phases */}
                            {idx < editablePhases.length - 1 && <div className="page-break" />}
                        </div>
                    ))}
                </div>

                <div className="container page-break">
                    <h4 className="mb-4 heading-1 ">Conclusion :</h4>
                    <p
                        className="full-width-text"
                        contentEditable
                        suppressContentEditableWarning
                        style={{ border: "1px dashed #ccc", padding: "8px", minHeight: "80px" }}
                    >
                        {editablePhases?.conclusion || ''}
                    </p>
                </div>

                <div className="container mt-4">
                    <PrintableEngineerDetails />
                </div>
            </div >
        );
    }
);

export default PrintableReport;
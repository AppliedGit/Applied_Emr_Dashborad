import React from 'react';

const PrintableEngineerDetails = () => {
    const engineerFields = [
        { label: 'TEST ENGINEER NAME', name: 'testEngineer' },
        { label: 'REPORT PREPARED AND ANALYSED BY', name: 'reportAnalyst' },
    ];

    return (
        <div className="container page-break">
            <h4 className="text-white text-center py-2 bg-danger">ENGINEER DETAILS</h4>
            <table className="table table-bordered">
                <tbody>
                    {engineerFields.map(({ label, name }, index) => (
                        <tr key={index}>
                            <th style={{ width: '30%' }}>
                                {label} <span className="text-danger">*</span>
                            </th>
                            <td data-value="">
                                <input
                                    type="text"
                                    name={name}
                                    className="form-control"
                                    required
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrintableEngineerDetails;

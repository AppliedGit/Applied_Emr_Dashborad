import React from 'react';

const PrintableOltcTable = () => {
    const oltcFields = [
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
    ];

    return (
        <div className="container page-break">
            <h4 className="text-white text-center py-2 bg-danger">OLTC DETAILS</h4>
            <table className="table table-bordered">
                <tbody>
                    {oltcFields.map(({ label, placeholder }, index) => (
                        <tr key={index}>
                            <th style={{ width: '30%',fontWeight:"400" }}>
                                {label} <span className="text-danger">*</span>
                            </th>
                            <td >
                                <input
                                    type="text"
                                    className="form-control  border-0"
                                    placeholder={placeholder}
                                    onInput={(e) => {
                                        e.target.parentElement.setAttribute('data-value', e.target.value);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrintableOltcTable;

import React, { useEffect } from 'react';

const PrintableTransformerTable = () => {
    const transformerFields = [
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
    ];

    useEffect(() => {
        const inputs = document.querySelectorAll('td input');

        const handleInput = function () {
            this.parentElement.setAttribute('data-value', this.value);
        };

        inputs.forEach(input => {
            input.addEventListener('input', handleInput);
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('input', handleInput);
            });
        };
    }, []);

    return (
        <div className='container'>
            <div className='print-center-page'>
                <h4 className="text-white text-center py-2 bg-danger ">TRANSFORMER DETAILS</h4>
                <table className="table table-bordered" >
                    <tbody>
                        {transformerFields.map(({ label, placeholder, type = 'text' }, index) => (
                            <tr key={index}>
                                <th style={{ width: '30%' }}>
                                    {label} <span className="text-danger">*</span>
                                </th>
                                <td data-value="">
                                    <input
                                        type={type}
                                        className="form-control"
                                        placeholder={placeholder}
                                        defaultValue=""
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrintableTransformerTable;

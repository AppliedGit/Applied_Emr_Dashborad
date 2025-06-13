import React, { useEffect } from 'react';

const PrintableTable = () => {
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


    return (
        <div className='container'>
            <table className='fullscreen-table'>
                <tbody>
                    <tr>
                        <th>Customer Name <span className='text-danger'>*</span></th>
                        <td data-value="">
                            <input type="text" placeholder="Enter customer name" className='form-control' defaultValue="" />
                        </td>
                    </tr>
                    <tr>
                        <th>Address <span className='text-danger'>*</span></th>
                        <td data-value="">
                            <input type="text" placeholder="Enter address"className='form-control' defaultValue="" />
                        </td>
                    </tr>
                    <tr>
                        <th>Work Order Number <span className='text-danger'>*</span></th>
                        <td data-value="">
                            <input type="text" placeholder="Enter work order"className='form-control' defaultValue="" />
                        </td>
                    </tr>
                    <tr>
                        <th>Date of Test <span className='text-danger'>*</span></th>
                        <td data-value="">
                            <input type="date" className='form-control'defaultValue="" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PrintableTable;


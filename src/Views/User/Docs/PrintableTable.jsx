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
    
    return (
        <div className='container'>
            <table className='fullscreen-table'>
                <tbody>
                    <tr>
                        <th>Customer Name </th>
                        <td data-value="">
                            <input type="text" placeholder="Enter customer name" className='form-control' defaultValue="" />
                        </td>
                    </tr>
                    <tr>
                        <th>Address </th>
                        <td data-value="">
                            <input type="text" placeholder="Enter address"className='form-control' defaultValue="" />
                        </td>
                    </tr>
                    <tr>
                        <th>Work Order Number </th>
                        <td data-value="">
                            <input type="text" placeholder="Enter work order"className='form-control' defaultValue="" />
                        </td>
                    </tr>
                    <tr>
                        <th>Date of Test </th>
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


import React, { useEffect } from 'react';

const PrintableTransformerTable = () => {

    const transformerFields = [
        { label: 'Manufacturer Name', placeholder: 'PRIMEMEIDAN ', maxLength: 50 },
        { label: 'Power Rating', placeholder: 'MVA', type: 'number', maxLength: 20 },
        { label: 'Voltage Rating', placeholder: 'kV', type: 'number', maxLength: 3 },
        { label: 'Vector Group', placeholder: 'YNyn0' },
        { label: 'Number of Phases', placeholder: '0', type: 'number' },
        { label: 'Rated Frequency', placeholder: 'Hz', type: 'number', maxLength: 3 },
        { label: 'Serial Number', placeholder: 'W01-107160089/G-01/13/16/00148' },
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
        <div className="container">
            <div className="print-center-page">
                <h4 className="text-white text-center py-2 bg-danger">TRANSFORMER DETAILS</h4>
                <table className="table table-bordered">
                    <tbody>
                        {transformerFields.map((field, index) => {
                            const unitMatch = field.placeholder.match(/([a-zA-Z]+)$/);
                            const unit = unitMatch ? unitMatch[1] : null;
                            const cleanPlaceholder = field.placeholder.replace(/([a-zA-Z]+)$/, '').trim();
                            return (
                                <tr key={index}>
                                    <th style={{ width: '30%', fontWeight: '400' }}>{field.label}</th>
                                    <td data-value="">
                                        {unit ? (
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 "
                                                    placeholder={cleanPlaceholder || unit}
                                                    defaultValue={field.defaultValue || ''}
                                                    maxLength={field.maxLength || 3}
                                                    onInput={(e) => {
                                                        let val = e.target.value;
                                                        if (field.type === 'number') {
                                                            val = val.replace(/\D/g, '');
                                                            if (field.maxLength) {
                                                                val = val.slice(0, field.maxLength);
                                                            }
                                                            e.target.value = val;
                                                        }
                                                        e.target.parentElement.parentElement.setAttribute(
                                                            'data-value',
                                                            val + (unit ? ` ${unit}` : '')
                                                        );
                                                    }}
                                                />

                                            </div>
                                        ) : (
                                            <input
                                                type={'text'}
                                                className="form-control border-0 "
                                                placeholder={field.placeholder}
                                                defaultValue=""
                                                onInput={(e) => {
                                                    e.target.parentElement.setAttribute('data-value', e.target.value);
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrintableTransformerTable;


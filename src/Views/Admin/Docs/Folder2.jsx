import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icons from 'Utils/Icons';
import ImageDetailsModal from './ImageDetailsModal';
import { handle_get_dir } from '../Action/AdminAction';
import useCommonState, { useDispatch } from 'ResuableFunctions/CustomHooks';

const Folder2 = () => {
    const { folder, file } = useParams();
    const { adminState } = useCommonState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(handle_get_dir(`${folder}/${file}`))
    }, [])

    const get_files = (files) => {
        return Array.isArray(files)
            ? files.flatMap(node => {
                const extension = node?.path?.split(".").pop();

                if (node.type === 'file') {
                    if (/(pth|json)/.test(extension)) {
                        return [];
                    }

                    return [node];
                }

                if (node.type === 'folder') return get_files(node.children || []);
                return [];
            })
            :
            []
    };

    const display_folders = (folders) => {
        return Array.isArray(folders) ? folders.flatMap(node => {
            const display_floder_path = `${folder}/${file}/`

            if (node.type === 'folder') {
                if (node.path === display_floder_path) {
                    return node;
                }

            }

            if (node.type === 'folder') return display_folders(node.children || []);
            return [];
        }) : []
    };

    const handleViewDetails = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <Link
                            to="/admin_dashboard"
                            style={{
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                marginBottom: '2px'
                            }}
                        >

                        </Link>
                        <h3 className="mb-0 mt-1">DRCM</h3>
                    </div>

                    <button
                        className="create-btn btn btn-primary border-0 w-100 w-md-auto"
                        onClick={() => navigate('/admin_dashboard/create')}
                    >
                        + Create Image Model
                    </button>
                </div>

                {/* Table View */}
                <div className="table-responsive mt-5 p-3" style={{ backgroundColor: "#FFFFFF", border: "12px" }}>
                    <div className="d-flex align-items-center gap-2 ">
                        <Link
                            to="/admin_dashboard"
                            style={{
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                marginBottom: '2px'
                            }}
                        >
                            {Icons.LeftArrow}
                        </Link>
                        <h3 className="mb-0 mt-1">{folder}</h3>
                    </div>
                    <p>Total Files: {get_files(adminState?.dir_data)?.length}</p>

                    <hr className='divider' />
                    <div className='p-4'>
                        <table className="table table-bordered  ">
                            <thead className="table-light text-center">
                                <tr>
                                    <th style={{ width: '10%' }}>S.No</th>
                                    <th>Class Name</th>
                                    <th style={{ width: '15%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_folders(adminState?.dir_data)[0]?.children?.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx+1}</td>
                                        <td>{item?.name}</td>
                                        <td className='d-flex justify-content-center'>
                                            <button
                                                className="btn btn-link p-0 "
                                                onClick={() => handleViewDetails(item?.children)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ImageDetailsModal
                show={showModal}
                onClose={() => setShowModal(false)}
                images={selectedCard}
            />
        </>
    );
};

export default Folder2;
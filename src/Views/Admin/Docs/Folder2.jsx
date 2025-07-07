import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icons from 'Utils/Icons';
import ImageDetailsModal from './ImageDetailsModal';
import { handle_get_dir } from '../Action/AdminAction';
import useCommonState, { useDispatch } from 'ResuableFunctions/CustomHooks';
import SpinnerComponent from 'Components/Spinner/Spinner';
import ButtonComponent from 'Components/Button/Button';
import { deletion_data, update_selected_modal_image } from '../Slice/Admin_slice';

const Folder2 = () => {
    const { folder, file } = useParams();
    const { adminState } = useCommonState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (adminState?.dir_glow) {
            dispatch(handle_get_dir(`${folder}/${file}`))
        }
    }, [adminState?.dir_glow]);

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
        dispatch(update_selected_modal_image({ data: card, show_modal: true }));
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

                {adminState?.dir_glow ?
                    <div className="row align-items-center justify-content-center" style={{ height: "43rem" }}>
                        <div className="col-6 text-center">
                            <SpinnerComponent variant="primary" />
                            <p className='mt-1'>Collecting data..</p>
                        </div>
                    </div>
                    :
                    <div className="table-responsive mt-5 p-3" style={{ backgroundColor: "#FFFFFF", border: "12px", height: "41rem" }}>
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
                        {/* <p>Total Files: {get_files(adminState?.dir_data)?.length}</p> */}

                        <hr className='divider' />
                        <div className='p-4'>
                            <table className="table table-bordered  ">
                                <thead className="table-light text-center">
                                    <tr>
                                        <th style={{ width: '10%' }}>S.No</th>
                                        <th>Class Name</th>
                                        <th style={{ width: '15%' }}>Action</th>
                                        <th style={{ width: '15%' }}>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {display_folders(adminState?.dir_data)[0]?.children?.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item?.name}</td>
                                            <td className='text-center'>
                                                <ButtonComponent
                                                    type="button"
                                                    className="btn btn-link p-0"
                                                    clickFunction={() => handleViewDetails(item?.children)}
                                                    buttonName="View"
                                                />
                                            </td>
                                            <td className='text-center'>
                                                <ButtonComponent
                                                    type="button"
                                                    className="btn py-2 ms-2"
                                                    style={{ backgroundColor: "#efefef9e" }}
                                                    clickFunction={() => dispatch(deletion_data({ path: item?.path, from: 'image_folder_deletion', type: 'Folder', name: item?.name }))}
                                                    buttonName={Icons?.Trash}
                                                    btnDisable={adminState?.delete_modal_data?.path}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>

            <ImageDetailsModal
                show={adminState?.selected_modal_image?.show_modal}
                onClose={() => dispatch(update_selected_modal_image({}))}
                images={adminState?.selected_modal_image?.data}
                deletion_path={adminState?.delete_modal_data?.path}
                folder={folder}
                file={file}
            />
        </>
    );
};

export default Folder2;
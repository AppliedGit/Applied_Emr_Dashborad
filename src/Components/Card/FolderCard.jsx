import ButtonComponent from 'Components/Button/Button';
import SpinnerComponent from 'Components/Spinner/Spinner';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCommonState, { useDispatch } from 'ResuableFunctions/CustomHooks';
import Icons from 'Utils/Icons';
import { handle_delete_data, handle_train_modal } from 'Views/Admin/Action/AdminAction';
import { train_modal_path } from 'Views/Admin/Slice/Admin_slice';
import { updateModalShow } from 'Views/Common/Slice/Common_slice';

const FolderCard = ({ item, is_under_tarining }) => {
  const { adminState } = useCommonState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function count_files(files) {
    if (!files || files.length === 0) return 0;

    return `${files?.map((item) => item?.children)?.flat()?.length} File`;
  }

  const get_files = (node) => {
    return Array.isArray(node.children)
      ? node.children.flatMap(child => {

        const extension = child?.path?.split(".").pop();

        if (child.type === 'file') {
          if (/(pth|json)/.test(extension)) {
            return [];
          }

          return [child];
        }

        if (child.type === 'folder') return get_files(child);
        return [];
      })
      : [];
  };

  function train_status(status) {
    switch (status) {
      case "train":
        return { backgroundColor: "#efefef9e", color: "#4a81bd" }

      case "training":
        return { backgroundColor: "#ffff001a", color: "#ff9c00" }

      case "trained":
        return { backgroundColor: "#EFFFEB", color: "#23890E" }

      default:
        break;
    }
  }

  return (
    <>
      <div className="card shadow-sm border-0 p-3 h-100" style={{ borderRadius: "12px", background: "#FFF" }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div>
            <h5 className="heading-1 mb-0">{item?.name || ''}</h5>
            <p className="text-muted small mb-0">Type: {item?.type || ''}</p>
          </div>
          <div className='d-flex flex-column'>
            <ButtonComponent
              type="button"
              className="btn"
              style={train_status(item?.status)}
              buttonName={item?.status}
              // btnDisable={adminState?.is_under_tarining}
              clickFunction={!/training|trained/.test(item?.status) ?
                () => dispatch(train_modal_path(item?.name))
                :
                null}
            />

            {
              adminState?.delete_modal_data?.path === item?.path ?
                <div className="mt-2 text-center">
                  <SpinnerComponent variant="primary" spinner_width_height={20} />
                </div>
                :
                <ButtonComponent
                  type="button"
                  className="btn btn-link text-danger p-0 mt-2"
                  clickFunction={() => dispatch(handle_delete_data({ path: item?.path, from: 'folder_deletion' }))}
                  buttonName="Delete"
                  btnDisable={adminState?.delete_modal_data?.path}
                />
            }
          </div>

        </div>

        <p className="text mb-2">Total Files: {get_files(item)?.length}</p>
        <hr className='divider mt-1' />

        <div className="d-flex justify-content-between text-center">
          {item?.children?.map((folder, index) => folder?.type === "folder" ?
            <div key={index}
              className="folder-box mx-1"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => navigate(`folder/${folder?.path}`)}
            >
              <div className="rounded-4 p-3 mb-1 d-flex align-items-center justify-content-center" style={{ height: "100px", background: "#E2EEFF" }}>
                {Icons.Folder}
              </div>
              <div className="heading-2 mt-2">{folder?.name || ''}</div>
              <div className="text small text-muted">
                {count_files(folder?.children)}
              </div>
            </div>
            :
            null
          )}
        </div>
      </div>
    </>
  );
};

export default FolderCard; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../Utils/Icons';


const FolderCard = ({ title, type, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = (folder) => {
    const route = `/folders/${folder.toLowerCase().replace(/\s/g, '-')}`;
    navigate(route);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(title);
    }
  };

  return (
    <>
      <div className="card shadow-sm border-0 p-3 h-100" style={{ borderRadius: "12px", background: "#FFF" }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div>
            <h5 className="heading-1 mb-0">{title}</h5>
            {type && <p className="text-muted small mb-0">Type: {type}</p>}
          </div>
          {/* <div className="dropdown">
            <button className="btn" data-bs-toggle="dropdown" aria-expanded="false">
              {Icons.DropdownDot}
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item text-danger" onClick={handleDelete}>
                  {Icons.Delete} Delete
                </button>
              </li>
            </ul>
          </div> */}
          <div className=''>
            <button className="btn" style={{backgroundColor:"#EFFFEB",color:"#23890E"}} >Trained</button>

          </div>
        </div>

        <p className="text mb-2">Total Files: 155 Files</p>
        <hr className='divider mt-1' />

        <div className="d-flex justify-content-between text-center">
          {["Train", "Val", ".PTH files"].map((folder, index) => (
            <div
              key={index}
              className="folder-box mx-1"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => handleNavigate(folder)}
            >
              <div
                className="rounded-4 p-3 mb-1 d-flex align-items-center justify-content-center"
                style={{ height: "100px", background: "#E2EEFF" }}
              >
                {Icons.Folder}
              </div>
              <div className="heading-2 mt-2">{folder}</div>
              <div className="text small text-muted">
                {folder === "Train" ? "12 files" : folder === "Val" ? "21 files" : "122 files"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FolderCard;






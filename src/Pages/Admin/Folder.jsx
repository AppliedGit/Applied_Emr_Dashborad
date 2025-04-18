// import React from 'react';
// // import FolderCard from './FolderCard'; // Assuming it's in the same folder
// import FolderCard from "../../Pages/Admin/FolderCard";
// const folderData = [
//   { title: "G1" }, { title: "F1" }, { title: "F2" },
//   { title: "F3" }, { title: "F4" }, { title: "F5" }
// ];

// const Folder = () => {
//   return (
//     <div className="container py-4">
//       <div className="row g-4">
//         {folderData.map((item, index) => (
//           <div className="col-12 col-sm-6 col-lg-4" key={index}>
//             {/* <FolderCard title={item.title} 
//             /> */}
//             <FolderCard
//               title={item.title}
//               onDelete={(folderName) => {
//                 console.log("Delete requested for:", folderName);
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Folder


import React from 'react';
import FolderCard from "../../Pages/Admin/FolderCard";

const folderData = [
  { title: "G1" }, { title: "F1" }, { title: "F2" },
  { title: "F3" }, { title: "F4" }, { title: "F5" }
];

const Folder = ({ searchTerm }) => {
  const filteredFolders = folderData.filter((folder) =>
    folder.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="row g-4">
        {filteredFolders.map((item, index) => (
          <div className="col-12 col-sm-6 col-lg-4" key={index}>
            <FolderCard
              title={item.title}
              onDelete={(folderName) => console.log("Delete requested for:", folderName)}
            />
          </div>
        ))}
        {filteredFolders.length === 0 && (
          <div className="text-center">No folders found</div>
        )}
      </div>
    </div>
  );
};

export default Folder;



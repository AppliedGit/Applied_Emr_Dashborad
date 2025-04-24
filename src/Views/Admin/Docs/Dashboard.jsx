import React, { useState } from 'react';
import Navbar from './Navbar';
import FolderCard from '../../../Components/Card/FolderCard';

const Dashboard = () => {
  const folders = ["Research Docs", "Client Files", "Raw", "G1-Pt", "Label"];
  const [searchText, setSearchText] = useState('');

  const filteredFolders = folders.filter(folder =>
    folder.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={setSearchText} />

      <div className="container mt-4">
        <div className="row">
          {filteredFolders.map((title, index) => (
            <div key={index} className="col-md-4 mb-3">
              <FolderCard title={title} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;



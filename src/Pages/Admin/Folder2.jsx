import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Icons from '../../Utils/Icons';
import ImageDetailsModal from './ImageDetailsModal';
import graph from "../../assets/graph.png";

const Folder2 = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const formattedTitle = type.replace(/-/g, ' ').toUpperCase();

    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(`cards-${type}`)) || [];
        if (stored.length > 0) {
            setCards(stored);
        } else {
            const initialCards = [...Array(3)].map(() => ({
                name: 'Class Name',
                date: '25-10-2025, 8:35 am',
                src: '',
                description: 'This is a sample description for the image.',
                fault: 'This is a sample fault related to the image.'
            }));
            setCards(initialCards);
            localStorage.setItem(`cards-${type}`, JSON.stringify(initialCards));
        }
    }, [type]);

    const handleCreate = () => {
        navigate(`/createimage/${type}`);
    };

    const handleViewDetails = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    
    const imageData = [
        { url: graph, date: '25-03-2024, 8:45 am' },
        { url: graph, date: '25-03-2024, 8:50 am' },
        { url: graph, date: '25-03-2024, 8:55 am' },
        { url: graph, date: '25-03-2024, 8:55 am' },
        { url: graph, date: '25-03-2024, 8:55 am' },
        { url: graph, date: '25-03-2024, 8:55 am' },
        { url: graph, date: '25-03-2024, 8:55 am' },
        { url: graph, date: '25-03-2024, 8:55 am' },
      
      ];

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <Link
                            to="/"
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
                        onClick={()=>navigate('/create')}
                    >
                        + Create Image Model
                    </button>
                </div>



                {/* Table View */}
                <div className="table-responsive mt-5 p-3" style={{ backgroundColor: "#FFFFFF", border: "12px" }}>
                    <div className="d-flex align-items-center gap-2 ">
                        <Link
                            to="/"
                            style={{
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                marginBottom: '2px'
                            }}
                        >
                            {Icons.LeftArrow}
                        </Link>
                        <h3 className="mb-0 mt-1">{formattedTitle}</h3>
                    </div>
                    <p>Total Files: {cards.length} Files</p>
                    <hr className='divider' />
                    <div className='p-4'>
                        <table className="table table-bordered  ">
                            <thead className="table-light text-center">
                                <tr>
                                    <th  style={{ width: '10%' }}>S.No</th>
                                    <th>Class Name</th>
                                    <th  style={{ width: '15%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((card, idx) => (
                                    <tr key={idx}>
                                        <td>{String(idx + 1).padStart(2, '0')}</td>
                                        <td>Class Name</td>
                                        <td className='d-flex justify-content-center'>
                                            <button
                                                className="btn btn-link p-0 "
                                                onClick={() => handleViewDetails(card)}
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
                images={imageData}
            />
        </>
    );
};

export default Folder2;









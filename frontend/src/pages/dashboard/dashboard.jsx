import React from 'react'
import { useApplicationsStore } from "../../store/useApplicationsStore";
import { useEffect, useState } from 'react';
import './dashboard.css'
import Header from '../../components/Header/header';
const SORT_STATES = {
  NONE: "none",
  ASC: "asc",
  DESC: "desc",
};

const Dashboard = () => {
  const { allComments, fetchComments } = useApplicationsStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: SORT_STATES.NONE });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchComments(); // Fetch from zustand on mount
  }, [fetchComments]);

  const handleSort = (key) => {
    let direction = SORT_STATES.ASC;
    if (sortConfig.key === key && sortConfig.direction === SORT_STATES.ASC) {
      direction = SORT_STATES.DESC;
    } else if (sortConfig.key === key && sortConfig.direction === SORT_STATES.DESC) {
      direction = SORT_STATES.NONE;
    }
    setSortConfig({ key, direction });
  };

  const filteredComments = allComments.filter((comment) =>
    [comment.name, comment.email, comment.body].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedComments = [...filteredComments].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (direction === SORT_STATES.NONE || !key) return 0;
    if (a[key] < b[key]) return direction === SORT_STATES.ASC ? -1 : 1;
    if (a[key] > b[key]) return direction === SORT_STATES.ASC ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedComments.length / itemsPerPage);
  const currentComments = sortedComments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
    <Header />
    
    <div className="table-container">
      <h2>Comments Table</h2>
      <input
        type="text"
        placeholder="Search name, email, comment..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className="search-box"
      />

      <div className="table-controls">
        <button onClick={() => handleSort("postId")}>Sort Post ID</button>
        <button onClick={() => handleSort("name")}>Sort Name</button>
        <button onClick={() => handleSort("email")}>Sort Email</button>
      </div>

      <table className="comments-table">
        <thead>
          <tr>
            <th className='field'>Post ID</th>
            <th className='field'>Name</th>
            <th className='field'>Email</th>
            <th className='field'>Comment</th>
          </tr>
        </thead>
        <tbody>
          {currentComments.map((item) => (
            <tr key={item.id}>
              <td>{item.postId}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.body.substring(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <select value={itemsPerPage} onChange={(e) => {
          setItemsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}>
          <option value={10}>10 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>
    </div>
     </>
  );
 
};




export default Dashboard

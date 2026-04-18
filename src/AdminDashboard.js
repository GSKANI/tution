import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const url = selectedStatus === 'all'
        ? '/api/admin/enquiries'
        : `/api/admin/enquiries?status=${selectedStatus}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEnquiries(data);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateEnquiryStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        await fetchEnquiries();
      }
    } catch (error) {
      console.error('Error updating enquiry:', error);
    }
  };

  const adminStyles = `
    .admin-container {
      background: #f8f5ef;
      padding: 40px;
      min-height: 100vh;
      font-family: 'Outfit', sans-serif;
    }
    .admin-header {
      background: #0b1f3a;
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .admin-filters {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .admin-filters button {
      background: white;
      border: 1px solid #ddd;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
    .admin-filters button.active {
      background: #d4a837;
      color: white;
      border-color: #d4a837;
    }
    .enquiry-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .enquiry-table table {
      width: 100%;
      border-collapse: collapse;
    }
    .enquiry-table th {
      background: #0b1f3a;
      color: white;
      padding: 12px;
      text-align: left;
    }
    .enquiry-table td {
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .status-new { background: #e8f5e9; color: #2e7d32; }
    .status-contacted { background: #e3f2fd; color: #1565c0; }
    .status-admitted { background: #f3e5f5; color: #6a1b9a; }
    .status-rejected { background: #ffebee; color: #c62828; }
    .action-select {
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    .loading {
      text-align: center;
      padding: 20px;
      color: #666;
    }
  `;

  return (
    <div className="admin-container">
      <style>{adminStyles}</style>
      
      <div className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Manage Student Enquiries & Admissions</p>
      </div>

      <div className="admin-filters">
        {['all', 'new', 'contacted', 'admitted', 'rejected'].map(status => (
          <button
            key={status}
            className={selectedStatus === status ? 'active' : ''}
            onClick={() => setSelectedStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">Loading enquiries...</div>
      ) : (
        <div className="enquiry-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Exam</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(enquiry => (
                <tr key={enquiry._id}>
                  <td>{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                  <td><strong>{enquiry.name}</strong></td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.std || '—'}</td>
                  <td>{enquiry.subject || '—'}</td>
                  <td>{enquiry.exam || '—'}</td>
                  <td>
                    <span className={`status-badge status-${enquiry.status}`}>
                      {enquiry.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="action-select"
                      value={enquiry.status}
                      onChange={(e) => updateEnquiryStatus(enquiry._id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="admitted">Admitted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {enquiries.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
              No enquiries found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import "./styles/ViewUsers.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container,Carousel } from 'react-bootstrap';
import FormWrapper from '../components/form/FormWrapper';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get('/users')
      .then(res => {
        console.log('Users from backend:', res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
  /*  <div>
      <h1>Users</h1>
      <Link to="/">← Back to Home</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} — {user.email} — Roles: {user.roles?.join(', ')}
            <Link to={`/users/edit/${user.id}`}> [Edit]</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>*/
//     <div className="table-container">
//   <div className="table-wrapper">
//     <h2 className="table-heading">Admin: View Users</h2>
//     <table className="table table-bordered">
//       <thead>
//         <tr>
//           <th>Username</th>
//           <th>Email</th>
//           <th>Roles</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(user => (
//           <tr key={user.id}>
//             <td>{user.username}</td>
//             <td>{user.email}</td>
//             <td>{user.roles?.join(', ')}</td>
//             <td>
//               <Link to={`/users/edit/${user.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
//               <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     <Link to="/" className="btn btn-secondary mt-3">← Back to Home</Link>
//   </div>
// </div>
<FormWrapper title="Admin: View Users">
  <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">View Users</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles?.join(', ')}</td>
                <td>
                  <Link to={`/users/edit/${user.id}`} className="btn btn-primary btn-sm me-2">Edit</Link>
                  <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <Link to="/" className="btn btn-secondary btn-sm mt-3">← Back to Home</Link>
      </div>
    </div>
  </div>
</FormWrapper>


  );
};

export default Users;
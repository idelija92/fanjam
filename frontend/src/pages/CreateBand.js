import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';
import FormWrapper from '../components/form/FormWrapper';
import FormInput from '../components/form/FormInput';
import FormButton from '../components/form/FormButton';

const CreateBand = () => {
  const [form, setForm] = useState({
    name: '',
    genre: '',
    description: '',
    managerId: ''
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/users')
      .then(res => {
        const bandRoleUsers = res.data.filter(user =>
          user.roles?.includes('BAND')
        );
        setUsers(bandRoleUsers);
      })
      .catch(err => console.error('Failed to fetch users', err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        genre: form.genre,
        description: form.description,
        manager: {
          id: Number(form.managerId)
        }
      };
      await API.post('/bands', payload);
      alert('Band created!');
      setForm({ name: '', genre: '', description: '', managerId: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to create band');
    }
  };

  return (
    // <FormWrapper title="Create Band">
    //   <p><Link to="/bands">← Back to Bands</Link></p>
    //   <form onSubmit={handleSubmit}>
    //     <FormInput name="name" placeholder="Name" value={form.name} onChange={handleChange} />
    //     <FormInput name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
    //     <FormInput name="description" placeholder="Description" value={form.description} onChange={handleChange} />

    //     <label>Assign Manager:</label>
    //     <select name="managerId" value={form.managerId} onChange={handleChange} required>
    //       <option value="">-- Select a Manager --</option>
    //       {users.map(user => (
    //         <option key={user.id} value={user.id}>{user.email}</option>
    //       ))}
    //     </select>

    //     <FormButton type="submit">Create</FormButton>
    //   </form>
    //   {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    // </FormWrapper>

    <FormWrapper title="Create Band">
  <div className="container mt-5">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Create Band</h5>
      </div>
      <div className="card-body">
        <p><Link to="/bands" className="btn btn-secondary btn-sm mb-3">← Back to Bands</Link></p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <FormInput name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="genre" className="form-label">Genre</label>
            <FormInput name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <FormInput name="description" placeholder="Description" value={form.description} onChange={handleChange} className="form-control" />
          </div>

          <div className="mb-3">
            <label htmlFor="managerId" className="form-label">Assign Manager</label>
            <select name="managerId" value={form.managerId} onChange={handleChange} required className="form-select">
              <option value="">-- Select a Manager --</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.email}</option>
              ))}
            </select>
          </div>

          <FormButton type="submit" className="btn btn-success">Create</FormButton>
        </form>

        {error && <p className="text-danger text-center mt-3">{error}</p>}
      </div>
    </div>
  </div>
</FormWrapper>


  );
};

export default CreateBand;

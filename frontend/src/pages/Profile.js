import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import ProfileCard from '../components/ProfileCard';

function Profile() {
    const auth = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ username: '', email: '' });
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
    const navigate = useNavigate();
    const { roles } = useRole();

    useEffect(() => {
        API.get('/auth/me')
            .then(res => {
                setUser(res.data);
                setForm({ username: res.data.username, email: res.data.email });
            })
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        API.put(`/users/${user.id}`, {
            ...user,
            username: form.username,
            email: form.email,
        })
            .then(res => {
                setUser(res.data);
                alert('Profile updated!');
            })
            .catch(err => {
                console.error(err);
                alert('Update failed.');
            });
    };

    const handlePasswordChange = () => {
        API.put('/auth/change-password', passwords)
            .then(() => {
                alert('Password changed successfully!');
                setPasswords({ currentPassword: '', newPassword: '' });
            })
            .catch(err => {
                console.error(err);
                alert('Failed to change password. Check current password.');
            });
    };

    const handleDeleteAccount = () => {
        if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return;

        API.delete('/auth/delete')
            .then(() => {
                alert('Your account has been deleted.');
                auth.logout();
                navigate('/');
            })
            .catch(err => {
                console.error(err);
                alert(err.response?.data || 'Failed to delete account.');
            });
    };

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="profile-page-container">
            <div className="profile-page-card">
                <ProfileCard user={{ ...user, roles }} form={form} onChange={handleChange} onSave={handleSave} />

                <div className="profile-section">
                    <h3>Change Password</h3>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    />
                    <button onClick={handlePasswordChange} className="profile-button green">
                        Change Password
                    </button>
                </div>

                <div className="profile-section danger-zone">
                    <h3>Danger Zone</h3>
                    <button onClick={handleDeleteAccount} className="profile-button red">
                        Delete My Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;

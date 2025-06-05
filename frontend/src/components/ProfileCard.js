import React from 'react';
import './ProfileCard.css';

function ProfileCard({ user, form, onChange, onSave }) {
    return (
        <div className="profile-card">
            <h2 className="profile-title">My Profile</h2>

            <div className="profile-field">
                <label>Username: </label>
                <input
                    name="username"
                    value={form.username}
                    onChange={onChange}
                />
            </div>
            <br />
            <div className="profile-field">
                <label>Email: </label>
                <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                />
            </div>
            <br />
            <div className="profile-field">
                <label>Role(s): </label>
                <p className="profile-roles">{user.roles?.join(', ') || user.role}</p>
            </div>

            <button className="profile-button" onClick={onSave}>
                Save Changes
            </button>
        </div>
    );
}

export default ProfileCard;

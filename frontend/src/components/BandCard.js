import React from 'react';
import { Link } from 'react-router-dom';
import useRole from '../hooks/useRole';
import './BandCard.css';

const BandCard = ({ band, showActions = false, onDelete }) => {
  const { isAdmin, isVenue, isBand } = useRole();
  const canSeeManager = isAdmin() || isVenue() || isBand();

  return (
    <li className="band-card">
      <div className="band-name">{band.name}</div>
      <div className="band-genre">{band.genre}</div>
      <div className="band-description">{band.description}</div>
      {canSeeManager && band.manager && (
        <div className="band-manager">Manager: {band.manager.email}</div>
      )}
      {showActions && (
        <div className="band-actions">
          <Link to={`/bands/edit/${band.id}`}>Edit</Link>
          <button onClick={() => onDelete(band.id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default BandCard;

import React from 'react';
import { Link } from 'react-router-dom';
import useRole from '../hooks/useRole';
import './BandCard.css';
import { Card, ListGroup, Button } from 'react-bootstrap';

const BandCard = ({ band, showActions = false, onDelete }) => {
  const { isAdmin, isVenue, isBand } = useRole();
  const canSeeManager = isAdmin() || isVenue() || isBand();

  return  (
             <div className="d-flex justify-content-center mt-4">
               <div className="col-md-10">
                 <Card className="shadow">
                   {/* Image */}
                   <Card.Img
                     variant="top"
                     src="mic2.png" // Replace with band.imageUrl if available
                     alt={band.name}
                     style={{ objectFit: 'cover', maxHeight: '300px' }}
                   />

                   {/* Band Name Header */}
                   <Card.Header className="bg-secondary text-white text-center">
                     <h5 className="mb-0">{band.name}</h5>
                   </Card.Header>

                   {/* Band Info */}
                   <Card.Body className="p-0">
                     <ListGroup className="list-group-flush text-center">
                       <ListGroup.Item>
                         <div className="mt-3">
                           Description
                           </div>
                           <h5><strong>{band.description}</strong></h5>
                         <strong>Genre:</strong> {band.genre}

                       </ListGroup.Item>

                       {canSeeManager && band.manager && (
                         <ListGroup.Item>
                         <div className="mt-3">
                         Proudly Managed By:
</div>
<div className="mb-4 text-muted">
                         <h7><strong>{band.manager.email}</strong></h7>
                           </div>
                         </ListGroup.Item>
                       )}
                     </ListGroup>

                   </Card.Body>

                   {/* Actions */}
                   {showActions && (
                     <Card.Footer>
                       <div
                         className="
                           d-flex
                           flex-column flex-sm-column flex-md-row
                           flex-wrap
                           justify-content-center
                             gap-3
                               mx-auto
                         "
                         style={{ maxWidth: '500px' }}
                       >
                         <Link to={`/bands/edit/${band.id}`} className="btn btn-secondary">
                           Edit Band
                         </Link>
                         <Button
                           variant="outline-danger"
                           onClick={() => onDelete?.(band.id)}
                         >
                           🗑️ Delete
                         </Button>
                       </div>
                     </Card.Footer>
                   )}
                 </Card>
               </div>
             </div>
           );
         }

{/*
<div
  className="
    d-flex
    flex-column flex-sm-column flex-md-row
    flex-wrap
    justify-content-center
    gap-3
    mx-auto
  "
  style={{ maxWidth: '500px' }}  // limits container width on large screens
>
  <Link to={`/events/${event.id}/winners`} className="btn btn-outline-warning">
    Song Rankings &raquo;
  </Link>

  {canVote && (
    <Link to={`/events/${event.id}/vote`} className="btn btn-outline-secondary">
      🎤 Vote for Songs
    </Link>
  )}

  {canRsvp && (
    isUserAttending ? (
      <button
        className="btn btn-outline-danger"
        onClick={() => {
          onCancelRsvp?.(event.id);
          setIsUserAttending(false);
          setAttendingCount(prev => prev - 1);
        }}
      >
        ❌ Cancel RSVP
      </button>
    ) : (
      <button
        className="btn btn-outline-success"
        onClick={() => {
          onRsvp?.(event.id);
          setIsUserAttending(true);
          setAttendingCount(prev => prev + 1);
        }}
      >
        ✅ RSVP
      </button>
    )
  )}

  {canEditDelete && (
    <>
      <Link to={`/events/edit/${event.id}`} className="btn btn-secondary">
         Edit Event
      </Link>

      <Button
        className="btn btn-secondary"
        onClick={() => onDelete?.(event.id)}
      >
        🗑️ Delete
      </Button>

    </>
  )}
</div>






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
*/}
export default BandCard;
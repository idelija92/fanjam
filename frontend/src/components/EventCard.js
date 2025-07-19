import React, { useContext, useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
//import './EventCard.css';
import useRole from '../hooks/useRole';
import { AuthContext } from '../context/AuthContext';
import { Card, ListGroup, Button, Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const EventCard = ({
    event,
    isAttending,
    onRsvp,
    onCancelRsvp,
    onDelete,
    showEditDelete = false,
}) => {

    const { isUser, isAdmin, isVenue, isBand } = useRole();
    const { currentUser } = useContext(AuthContext);

    const canVote = isUser() || isAdmin();
    const canRsvp = isUser() || isAdmin();
    const canEditDelete = isAdmin() || (isVenue() && event.createdBy?.email === currentUser?.email);
    const [attendingCount, setAttendingCount] = useState(event.rsvps?.length || 0);
    const [isUserAttending, setIsUserAttending] = useState(isAttending);

useEffect(() => {
  setAttendingCount(event.rsvps?.length || 0);
}, [event.rsvps]);



{/*
 return (
     <div className="d-flex justify-content-center mt-4">
       <div className="col-md-8">
         <Card>
           <Card.Header className="bg-secondary text-white">
             <h5 className="mb-0">{event.title}</h5>
           </Card.Header>
           <Card.Body className="p-0">
             <ListGroup className="list-group-flush">
               <ListGroup.Item><strong>Date:</strong> {event.date} at {event.time}</ListGroup.Item>
               <ListGroup.Item><strong>Venue:</strong> {event.venue}</ListGroup.Item>
               <ListGroup.Item><strong>Location:</strong> {event.location}</ListGroup.Item>
               <ListGroup.Item><strong>Type:</strong> {event.type}</ListGroup.Item>
               <ListGroup.Item><strong>Description:</strong> {event.description}</ListGroup.Item>
               <ListGroup.Item>
                 <strong>Bands & Setlists:</strong>
                 <ul className="mt-2 mb-0">
                   {event.bands?.map(band => (
                     <li key={band.id}>
                       <strong>{band.name}</strong>
                       {band.customSongSlots != null && (
                         <div>🎶 Custom Song Slots: {band.customSongSlots}</div>
                       )}
                       {band.setlist?.length > 0 && (
                         <ul>
                           {band.setlist.map((song, i) => (
                             <li key={i}>🎵 {song}</li>
                           ))}
                         </ul>
                       )}
                     </li>
                   ))}
                 </ul>
               </ListGroup.Item>
               <ListGroup.Item>
                 <strong>Attending:</strong> {event.rsvps?.length || 0}
               </ListGroup.Item>
               <ListGroup.Item>
                 <div className="d-flex flex-wrap gap-2 align-items-center">
                   <Link to={`/events/${event.id}/winners`} className="btn btn-outline-secondary btn-sm">
                     🏆 Rankings
                   </Link>

                   {canVote && (
                     <Link to={`/events/${event.id}/vote`} className="btn btn-outline-primary btn-sm">
                       🎤 Vote
                     </Link>
                   )}

                   {canRsvp && (
                     isAttending ? (
                       <>
                         <span className="text-success">✅ Attending</span>
                         <Button
                           variant="outline-danger"
                           size="sm"
                           onClick={() => onCancelRsvp?.(event.id)}
                         >
                           Cancel RSVP
                         </Button>
                       </>
                     ) : (
                       <Button
                         variant="outline-success"
                         size="sm"
                         onClick={() => onRsvp?.(event.id)}
                       >
                         RSVP
                       </Button>
                     )
                   )}

                   {canEditDelete && (
                     <>
                       <Link to={`/events/edit/${event.id}`} className="btn btn-outline-warning btn-sm">
                         ✏️ Edit
                       </Link>
                       <Button
                         variant="outline-danger"
                         size="sm"
                         onClick={() => onDelete?.(event.id)}
                       >
                         🗑️ Delete
                       </Button>
                     </>
                   )}
                 </div>
               </ListGroup.Item>
             </ListGroup>
           </Card.Body>
         </Card>
       </div>
     </div>
  );
  };
*/}

return (
    <div className="d-flex justify-content-center mt-4">
      <div className="col-md-8">
        <Card className="shadow">

          <Card.Img
            variant="top"
            src={event.imageUrl || 'guitar.jpg'}
            alt="Event"
            style={{ objectFit: 'cover', maxHeight: '300px' }}
          />


          <Card.Header className="bg-secondary text-white text-center">
            <h5 className="mb-0">{event.title}</h5>
          </Card.Header>


          <Card.Body className="p-0 text-center">
          <p className="event-details ">
                          {event.date} at {event.time}
                          </p>
                          <p>
                         <h5><strong>{event.venue}</strong></h5>

                        </p>




            <ListGroup className="list-group-flush ">
             {/* <ListGroup.Item>
              <div className="row">
              <div className="col-4 fw-bold text-start">Description:</div>
              <div className="col-8 text-start">{event.description}</div>
                </div>
              </ListGroup.Item>
              <ListGroup.Item><strong>Date:</strong> {event.date} at {event.time}</ListGroup.Item>
              <ListGroup.Item><strong>Venue:</strong> {event.venue}</ListGroup.Item>
              <ListGroup.Item><strong>Location:</strong> {event.location}</ListGroup.Item>
              <ListGroup.Item><strong>Type:</strong> {event.type}</ListGroup.Item>*/}




               {/*
                <ListGroup.Item>
                <strong>Bands & Setlists:</strong>

                <ul className="mt-2 mb-0">
                  {event.bands?.map(band => (
                    <li key={band.id}>
                      <strong>{band.name}</strong>
                      {band.customSongSlots != null && (
                        <div>🎶 Custom Song Slots: {band.customSongSlots}</div>
                      )}
                      {band.setlist?.length > 0 && (
                        <ul>
                          {band.setlist.map((song, i) => (
                            <li key={i}>🎵 {song}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>




              <ListGroup.Item>
                <strong>Bands & Setlists:</strong>

                <div className="mt-3">
                  {event.bands?.map((band) => (
                    <div key={band.id} className="mb-3">
                      <strong>{band.name}</strong>

                      {band.customSongSlots != null && (
                        <div>🎶 Custom Song Slots: {band.customSongSlots}</div>
                      )}

                      {band.setlist?.length > 0 && (
                        <div className="row mt-2">
                          {band.setlist.map((song, i) => (
                            <div key={i} className="col-md-4 col-sm-6 mb-2">
                              🎵 {song}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ListGroup.Item>


              <ListGroup.Item>
                <strong>Bands & Setlists:</strong>

                <div className="mt-3">
                  {event.bands?.map((band) => (
                    <div key={band.id} className="mb-3">
                      <strong>{band.name}</strong>

                      {band.customSongSlots != null && (
                        <div>🎶 Custom Song Slots: {band.customSongSlots}</div>
                      )}

                      {band.setlist?.length > 0 && (
                        <div className="row mt-2">
                          {band.setlist.map((song, i) => (
                            <div key={i} className="col-md-4 col-sm-6 mb-2" style={{ textAlign: 'justify' }}>
                              🎵 {song}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ListGroup.Item>
*/}



<ListGroup.Item>
  <div className="mt-3">
    featuring
    {event.bands?.map((band) => (
      <div key={band.id} className="mb-4">
        <h5><strong>{band.name}</strong></h5>
        <hr />



        {(band.customSongSlots > 0 || band.setlist?.length > 0) && (
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {band.setlist?.length > 0 && (
              <div><strong>Total Songs: </strong>{band.setlist.length}</div>
            )}

            {band.customSongSlots > 0 && (
              <div><strong>Custom Song Slots: </strong>{band.customSongSlots}</div>
            )}
          </div>
        )}

        <p></p>

        {band.setlist?.length > 0 && (
          <div className="row">
            {band.setlist.map((song, i) => (
              <div key={i} className="col-md-4 col-sm-6 mb-2 text-start">
                🎵 {song}
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</ListGroup.Item>



              <ListGroup.Item>

              <div className="d-flex flex-wrap justify-content-center gap-4">
                <strong>Attending:</strong> {attendingCount}
                <strong> Ticket Price: </strong> {event.type}
                </div>
              </ListGroup.Item>
               <ListGroup.Item>
               <h5 className="display-7 fw-normal text-muted">{event.description}</h5>
               </ListGroup.Item>
            </ListGroup>



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


{/*}
            <div className="d-flex flex-wrap justify-content-center gap-4">
              <Link to={`/events/${event.id}/winners`} className="btn btn-outline-warning my-2 me-3">
                                                                   Song Rankings &raquo;
                                                                  </Link>

              {canVote && (

                                <Link to={`/events/${event.id}/vote`} className="btn btn-outline-secondary my-2 me-3">
                                  🎤 Vote for Songs
                                </Link>


              )}


            {canRsvp && (
              isUserAttending ? (
                <>

                  <button
                    className="btn btn-outline-danger my-2 me-3"
                    onClick={() => {
                      onCancelRsvp?.(event.id);
                      setIsUserAttending(false);
                      setAttendingCount(prev => prev - 1);
                    }}
                  >
                    ❌ Cancel RSVP
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-success my-2 me-3"
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




        {/*}      {canRsvp && (
                isAttending ? (
                  <>
                    <span className="text-success">✅ Attending</span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onCancelRsvp?.(event.id)}
                    >
                      Cancel RSVP
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => onRsvp?.(event.id)}
                  >
                    RSVP
                  </Button>
                )
              )}

              {canEditDelete && (
                <>
                <Link to={`/events/edit/${event.id}`} className="btn btn-secondary my-2 me-3">
                                                  Edit Event>>
                                                </Link>

                  <Button className="btn btn-secondary my-2 me-3"
                    onClick={() => onDelete?.(event.id)}
                  >
                    🗑️ Delete
                  </Button>
                </>
              )}
            </div>
*/}
          </Card.Body>


          <Card.Footer className="card-footer text-muted text-center mt-4">
             {event.location}
          </Card.Footer>

        </Card>
      </div>
    </div>
  );
};

/*
  return (
    <Card className="text-center shadow" style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={event.imageUrl || '/guitar.jpg'}
        alt="Event Image"
        style={{ objectFit: 'cover', height: '180px' }}
      />

      <Card.Body>
        <Card.Title as="h4">{event.title}</Card.Title>

        <p className="mb-1">{event.date} at</p>
        <p><strong>{event.venue}</strong></p>

        <hr className="my-2" />

        <Link
          to={`/events/${event.id}/winners`}
          className="btn btn-outline-warning btn-sm my-2 me-2"
        >
          🏆 Song Rankings &raquo;
        </Link>

        {canVote && (
          <Link
            to={`/events/${event.id}/vote`}
            className="btn btn-outline-secondary btn-sm my-2 me-2"
          >
            🎤 Vote for Songs
          </Link>
        )}

        {canRsvp && (
          isAttending ? (
            <>
              <div className="text-success mb-2">✅ Attending</div>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onCancelRsvp?.(event.id)}
              >
                Cancel RSVP
              </Button>
            </>
          ) : (
            <Button
              variant="outline-success"
              size="sm"
              className="my-2"
              onClick={() => onRsvp?.(event.id)}
            >
              RSVP
            </Button>
          )
        )}

        {canEditDelete && (
          <div className="mt-3 d-flex flex-column gap-2">
            <Link to={`/events/edit/${event.id}`} className="btn btn-outline-warning btn-sm">
              ✏️ Edit
            </Link>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => onDelete?.(event.id)}
            >
              🗑️ Delete
            </Button>
          </div>
        )}
      </Card.Body>

      <Card.Footer className="text-muted">
        📍 {event.location}
      </Card.Footer>
    </Card>
  );
};






{/*
        <div className="event-card-container">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date} at {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Bands & Setlists:</strong></p>
            <ul>
                {event.bands?.map(band => (
                    <li key={band.id}>
                        <strong>{band.name}</strong>
                        {band.customSongSlots != null && (
                            <p>🎶 Custom Song Slots: {band.customSongSlots}</p>
                        )}
                        {band.setlist?.length > 0 && (
                            <ul>
                                {band.setlist.map((song, i) => (
                                    <li key={i}>🎵 {song}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

            <div className="event-actions">
                <Link to={`/events/${event.id}/winners`}>🏆 Rankings</Link><br></br>
                <p><strong>Attending:</strong> {event.rsvps?.length || 0}</p>
            </div>

            {canVote && (
                <Link to={`/events/${event.id}/vote`}>🎤 Vote</Link>
            )}

            {canRsvp && (
                <div className="rsvp-section">
                    {isAttending ? (
                        <>
                            <p>✅ You are attending</p>
                            <button onClick={() => onCancelRsvp?.(event.id)}>Cancel RSVP</button>
                        </>
                    ) : (
                        <button onClick={() => onRsvp?.(event.id)}>RSVP</button>
                    )}
                </div>
            )}

            {canEditDelete && (
                <div className="admin-controls">
                    <Link to={`/events/edit/${event.id}`}>Edit</Link> |{' '}
                    <button onClick={() => onDelete?.(event.id)}>Delete</button>
                </div>
            )}

        </div>
        */


export default EventCard;

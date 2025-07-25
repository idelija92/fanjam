import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import API from '../services/api';
//import "./styles/Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container, Carousel, Card} from 'react-bootstrap';


const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isAdmin, isVenue, isBand } = useRole();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get('/events');
        setEvents(res.data || []);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    };

    fetchEvents();
  }, []);

 const getEventImage = (event) => {
          if (event.venue === 'The Curragh Racecourse') return '/Horse-Country.png';
          if (event.venue === 'Shenanigans Pub') return '/flame_guitar_venue.png';
          if (event.venue === 'Messers Pub') return '/crowd_hands_up.jpg';
          if (event.venue === 'Whelans Pub') return '/enjoying.png';
          if (event.location === 'Dublin') return '/mic2.png';
          return '/guitar.jpg';
    };


  return (
  <>
 <section className="jumbotron text-center">
   <div className="container text-center py-5">
     <div className="col-md-8 mx-auto">
       <h1 className="display-7 fw-normal" >Welcome to</h1>
       <img className="logo" src="Fanjampic6.png" alt="Fanjam Logo" height="50" />
<hr></hr>
       <p className="lead fw-normal">
         Be apart of the event with Fanjam. A new and exciting interactive experience for Fans and Bands.
</p>
<p className="lead fw-normal">
Are you ready to to Jam?
       </p>
       <p>
<Button as={Link} to="/bands" variant="outline-warning" className="my-2 me-3">
  Browse Bands &raquo;
</Button>

<Button as={Link} to="/events" variant="outline-warning" className="my-2 me-3">
  View Events &raquo;
</Button>
       </p>
       {isAuthenticated && isAdmin() && (
                   <div className="admin-tools d-flex flex-wrap justify-content-center gap-3 mt-3">
                     <Button as={Link} to="/bands/create" variant="outline-secondary">
                       🎸 Add New Band
                     </Button>
                     <Button as={Link} to="/events/create" variant="outline-secondary">
                       🎶 Add New Event
                     </Button>

                     <Button as={Link} to="/users/create" variant="outline-secondary">
                       ➕ Add New User
                     </Button>
                     <Button as={Link} to="/users" variant="outline-secondary">
                       👤 Manage Users
                     </Button>
                   </div>
                 )}
                       {isAuthenticated && isVenue() && !isAdmin() && (
                         <div className="admin-tools d-flex flex-wrap justify-content-center gap-3 mt-3">

                           <Button as={Link} to="/events/create" variant="outline-secondary">
                                                  🎶 Add New Event
                                                </Button>
                         </div>
                       )}


     </div>
   </div>
 </section>



<section>
  <div className="position-relative overflow-hidden bg-light w-100" style={{ minHeight: '40vh' }}>
    <img
      src="instruments.png"
      alt="Full width"
      className="img-fluid w-100 h-100 object-fit-cover position-absolute top-0 start-0"
      style={{ zIndex: 0 }}
    />
<div className="position-absolute top-50 start-50 translate-middle text-white text-center w-100 px-3">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
        <h1 className="display-5 display-5-sm fw-semibold mb-3 mb-md-4">
          The FanJam Experience
        </h1>

        <p className="lead fw-normal fs-6 fs-md-5 mb-3 mb-md-4">
          Stop watching. Start jamming. Connect with artists and fans in real-time.
        </p>
         <Button as={Link} to="/about" variant="warning" className="my-2 me-3">
          Learn More
         </Button>
      </div>

    </div>

  </div>

</section>



 {/*} <section>
    <div className="position-relative overflow-hidden bg-light w-100">
      <img src="instruments.png" alt="Full width" className="img-fluid w-100" />
      <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
        <div className="col-md-12 mx-auto">
          <h1 className="display-7 fw-normal">Admin Tools</h1>
          <hr/>
          <p className="lead fw-normal">
            It's Playtime. Select from the options below to have some Fun :)
          </p>

          {isAuthenticated && isAdmin() && (
            <div className="admin-tools d-flex flex-wrap justify-content-center gap-3 mt-3">
              <Button as={Link} to="/bands/create" variant="warning">
                🎸 Add New Band
              </Button>
              <Button as={Link} to="/events/create" variant="warning">
                🎶 Add New Event
              </Button>

              <Button as={Link} to="/users/create" variant="warning">
                ➕ Add New User
              </Button>
              <Button as={Link} to="/users" variant="warning">
                👤 Manage Users
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>




 <section className="bg-light w-100 py-5">
  {isAuthenticated && isAdmin() && (
  <div className="admin-tools">
    <div className="container text-center py-5">
      <div className="col-md-8 mx-auto">
        <h1 className="display-7 fw-normal" >Admin Tools</h1>


        <p className="lead fw-normal">
          Its Playtime. Select from the options below to have some Fun :)
 </p>





                    <div>
                    <a className="btn btn-warning my-2 me-3" href="/bands/create">🎸 Add New Band</a>
                    <a className="btn btn-warning my-2 me-3" href="/events/create">🎶 Add New Event</a>
                    <a className="btn btn-warning my-2 me-3" href="/users/create">➕ Add New User</a>
                    <a className="btn btn-warning my-2" href="/users">👤 Manage Users</a>
                    </div>
                   </div>


      </div>
    </div>
      )}
  </section>





     <section>
           <Carousel>

             <Carousel.Item>
               <img
                 src="/instruments.png"
                 alt="Full width"
                 className="img-fluid w-100"
                 style={{ objectFit: 'cover', height: 'auto', maxHeight: '70vh' }}
               />
               <Carousel.Caption>
                 <Container>
                   <h1 className="display-6 fw-semibold">The FanJam Experience</h1>
                   <p className="lead fw-normal">
                     Stop watching. Start jamming. Connect with artists and fans in real-time.
                   </p>
                   <a className="btn btn-warning my-2" href="#">
                     Learn More
                   </a>
                 </Container>
               </Carousel.Caption>
             </Carousel.Item>


             <Carousel.Item>
               <img
                 src="/enjoying2.png"
                 alt="Excited crowd"
                 className="img-fluid w-100"
                 style={{ objectFit: 'cover', height: 'auto', maxHeight: '70vh' }}
               />
               <Carousel.Caption>
                 <Container>
                   <h1 className="display-6 fw-semibold">Find Your Next Night Out</h1>
                   <p className="lead fw-normal">
                     See Up and Coming Events. It’s Playtime! Let’s Have Some Fun :)
                   </p>
                   <a className="btn btn-warning my-2" href="/events">
                     View Events
                   </a>
                 </Container>
               </Carousel.Caption>
             </Carousel.Item>
           </Carousel>
         </section>





{/*}
<section>
<hr/>



      <div class="container marketing">

        {/*<!-- Three columns of text below the carousel -->
        <div class="row">
          <div class="col-lg-4">
            <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
            <h2>Heading</h2>
            <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
          </div>
          <div class="col-lg-4">
            <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
            <h2>Heading</h2>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.</p>
            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
          </div>
          <div class="col-lg-4">
            <img class="rounded-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
            <h2>Heading</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a class="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
          </div>
        </div>


        <hr class="featurette-divider"/>

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">First featurette heading. <span class="text-muted">It'll blow your mind.</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="Generic placeholder image"/>
          </div>
        </div>

        <hr class="featurette-divider"/>

        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">Oh yeah, it's that good. <span class="text-muted">See for yourself.</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5 order-md-1">
            <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="Generic placeholder image"/>
          </div>
        </div>

        <hr class="featurette-divider"/>

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
          </div>
          <div class="col-md-5">
            <img class="featurette-image img-fluid mx-auto" data-src="holder.js/500x500/auto" alt="Generic placeholder image"/>
          </div>
        </div>

        <hr class="featurette-divider"></hr>



      </div>
</section>









 <body>
<div className="bg-light w-100 py-5">
  <div className="container text-center">
    <div className="col-md-8 mx-auto my-5">
      <h1 className="display-4 fw-normal">Punny headline</h1>
      <p className="lead fw-normal">
        And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.
      </p>
      <a className="btn btn-outline-secondary" href="#">Coming soon</a>
    </div>
  </div>
</div>
     <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
       <div class="col-md-5 p-lg-5 mx-auto my-5">
         <h1 class="display-4 font-weight-normal">Punny headline</h1>
         <p class="lead font-weight-normal">And an even wittier subheading to boot. Jumpstart your marketing efforts with this example based on Apple's marketing pages.</p>
         <a class="btn btn-outline-secondary" href="#">Coming soon</a>
       </div>
       <div class="product-device box-shadow d-none d-md-block"></div>
       <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
     </div>

<section class="position-relative">
    <img src="#" alt="Full width" class="img-fluid w-100"/>
    <div class="position-absolute top-50 start-50 translate-middle text-white text-center">
      <h1>Your Heading</h1>
      <p>Optional subheading or call to action</p>
    </div>
  </section>


    </body>

    <div className="home-container">
      <h1 className="home-title">Welcome to FanJam 🎸🎷🎧🎶</h1>


      <nav>
        <ul className="nav-links">
          <li><Link to="/bands">Browse Bands</Link></li>
          <li><Link to="/events">View Events</Link></li>
        </ul>
      </nav>

      {isAuthenticated && isAdmin() && (
        <div className="admin-tools">
          <h3>Admin Tools</h3>

          <div>
          <a className="btn btn-warning my-2 me-3" href="/bands/create">🎸 Add New Band</a>
          <a className="btn btn-warning my-2 me-3" href="/events/create">🎶 Add New Event</a>
          <a className="btn btn-warning my-2 me-3" href="/users/create">➕ Add New User</a>
          <a className="btn btn-warning my-2" href="/users">👤 Manage Users</a>
          </div>

        </div>

      )}

      {isAuthenticated && isVenue() && !isAdmin() && (
        <div className="admin-tools">
          <h3>Venue Tools</h3>
          <a className="btn btn-warning my-2 me-3" href="/events/create">🎶 Add New Event</a>
          <ul>
            <li><Link to="/events/create">➕ Add New Event</Link></li>
          </ul>
        </div>
      )}

      <h2 className="events-heading">Current Events</h2>

      {events.length === 0 ? (
        <p>No events available yet!</p>
      ) : (
        <div>
          {Array.isArray(events) && events.map(event => (
            <div key={event.id} className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-details">{event.date} at <strong>{event.venue}</strong></p>
              <div className="event-links">
                <Link to={`/events/${event.id}/winners`} className="rankings">
                  🏆 View Song Rankings
                </Link>
              </div>
              {isAuthenticated && (
                <div className="event-links">
                  <Link to={`/events/${event.id}/vote`} className="vote">
                    🎤 Vote for Songs
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>





<section className="jumbotron text-center">
   <div className="container text-center py-5">
     <div className="col-md-10 mx-auto">
<h1 className="display-7 fw-normal">Current Events</h1>

<div>
  {Array.isArray(events) && events.map(event => (
    <div key={event.id} className="event-card">
      <div className="container my-4">
        <div className="card text-center mx-auto" >


          <div className="card-header event-title">
            {event.title}
          </div>


          <div className="card-body">
            <h5 className="card-title">Special title treatment</h5>
            <p className="event-details">
              {event.date} at <strong>{event.venue}</strong>
            </p>


            <div className="event-links d-flex justify-content-center gap-3">
              <Link to={`/events/${event.id}/winners`} className="btn btn-outline-success">
                🏆 View Song Rankings
              </Link>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>


          <div className="card-footer text-muted">
            2 days ago
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

<div className="card" style={{ width: "18rem" }}>
  <img className="card-img-top" src="guitar.jpg" alt="Card image cap" />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
     <p className="event-details">
                  {event.date} at <strong>{event.venue}</strong>
                </p>
<Link to={`/events/${event.id}/winners`} className="btn btn-outline-success">
                🏆 View Song Rankings
              </Link>
              <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Cras justo odio</li>
    <li className="list-group-item">Dapibus ac facilisis in</li>
    <li className="list-group-item">Vestibulum at eros</li>
  </ul>
  <div className="card-body">
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div>




</div>
</div>
</section>


    <div class="card text-center">
      <div class="card-header">
        Featured
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>


*/}




<section className="jumbotron text-center">
  <div className="container text-center py-5">
    <div className="col-md-10 mx-auto">
      <h1 className="display-7 fw-normal">Events</h1>



      <div className="d-flex flex-wrap justify-content-center gap-4">
        {Array.isArray(events) && events.map(event => (
          <div key={event.id} className="card" style={{ width: "18rem" }}>
            <img className="card-img-top" src={getEventImage(event)} alt={event.title}
            style={{ height: '200px',objectFit: 'cover',objectPosition: 'center' }}/>


            <div className="card-body">

              <h4 className="card-title">{event.title}</h4>

              <p className="event-details">
                {event.date} at
                </p>
                <p>
               <strong>{event.venue}</strong>

              </p>

                <hr/>
                          <Link to={`/events/${event.id}/winners`} className="btn btn-outline-warning my-2 me-3">
                                                     Song Rankings &raquo;
                                                    </Link>
{isAuthenticated && (
                <div className="event-links">
                  <Link to={`/events/${event.id}/vote`} className="btn btn-outline-secondary my-2 me-3">
                    🎤 Vote for Songs
                  </Link>
                </div>
              )}
            </div>

            <div className="card-footer text-muted">{event.location}
            </div>

          </div>
        ))}
      </div>
    </div>
  </div>

</section>



{/*
//image section with text


<section>
<div className="position-relative overflow-hidden bg-light w-100">
<img src="instruments.png" alt="Full width" class="img-fluid w-100"/>
    <div class="position-absolute top-50 start-50 translate-middle text-white text-center">
    <div className="col-md-8 mx-auto">
      <h1 className="display-7 fw-normal">Admin Tools </h1>
      <p className="lead fw-normal">
        Its Playtime. Select from the options below
      </p>
          {isAuthenticated && isAdmin() && (
                        <div className="admin-tools">
                        <div className="admin-tools d-flex flex-wrap justify-content-center gap-3 mt-3">


                          <div>
                          <a className="btn btn-warning my-2 me-3" href="/bands/create">🎸 Add New Band</a>
                          <a className="btn btn-warning my-2 me-3" href="/events/create">🎶 Add New Event</a>
                          <a className="btn btn-warning my-2 me-3" href="/users/create">➕ Add New User</a>
                          <a className="btn btn-warning my-2" href="/users">👤 Manage Users</a>
                          </div>
                         </div>
                         </div>
                         )}
</div>
  </div>
  </div>
  </section>

*/}








           </>
  );
};

export default Home;

import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useRole from '../hooks/useRole';
import API from '../services/api';
import "./styles/Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Container,Row, Col, Card,} from 'react-bootstrap';


const About = () => {
  return (


    <section className="jumbotron text-center">
       <div className="container text-center py-5">
         <div className="col-md-12 mx-auto">
           <h1 className="display-7 fw-normal" >About</h1>
           <img className="logo" src="Fanjampic6.png" alt="Fanjam Logo" height="50" />
    <hr></hr>
    <br/>
    <h4> Where Music Meets Connection</h4>
    <br/>
           <h6 className="lead fw-normal">
             Be apart of the event with Fanjam. A new and exciting interactive experience for Fans and Bands.
             <br/><br/>

             FanJam is the ultimate fan engagement platform built specifically for emerging artists and cover bands.
             <br/>
             It transforms the traditional concert experience into an interactive event, connecting artists and fans before and during live performances like never before.
              <br/><br/>

    </h6>
    <h5> Join events, browse bands, let your voice be heard </h5> <br/>
    <h4>Try it For Yourself
           </h4><br/>

    <Button as={Link} to="/bands" variant="outline-warning" className="my-2 me-3">
      Browse Bands &raquo;
    </Button>
    <Button as={Link} to="/events" variant="outline-secondary">
                      View Events
                    </Button>
    </div>
    </div>





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
        <h8 className="display-6 display-5-sm fw-semibold mb-3 mb-md-4">
        FanJam
        <br/>
        Are you ready to to Jam?
        </h8>

        <p className="lead fw-normal fs-6 fs-md-5 mb-3 mb-md-4">

        </p>
         <Button as={Link} to="/" variant="warning" className="my-2 me-3">
          Lets Begin
         </Button>
      </div>

    </div>

  </div>

</section>
</section>

  );
};

export default About;
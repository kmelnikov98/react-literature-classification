import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../styles/infoBoard.css'

const InfoBoard = () => {
    return (
        <Carousel className="infoBoardContainer">
          <Carousel.Item>
            <img
              style={{ height: "500px" }}
              className="d-block w-100"
              src={require('../images/slide1.jpg')}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Youtube Music Classification</h3>
              <p>Classify youtube links by genre...</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "500px" }}
              className="d-block w-100"
              src={require('../images/slide2.jpg')}
              alt="Second slide"
            />
    
            <Carousel.Caption>
              <h3>Youtube to MP3</h3>
              <p>Download uploaded youtube videos as an MP3...</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ height: "500px" }}
              className="d-block w-100"
              src={require('../images/slide3.jpg')}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>View your youtube links</h3>
              <p>
                We save all the classifications done by our users. Make
                a free account today download your youtube videos in MP3 format!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

export default InfoBoard
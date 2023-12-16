import React from "react";
import Layout from "./../components/Layout/Layout";
import { useState, useEffect } from 'react';
import axios from 'axios';
const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://catfact.ninja/fact');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title={'About'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Step into a world of cinematic wonder at our Cinema.
          Since our establishment in 2017, we've been dedicated to delivering an unparalleled movie-going experience.
          Our theaters are more than just screens and seats; they are portals to captivating stories, thrilling adventures, and unforgettable moments.
          At our Cinema, we celebrate the magic of cinema.
          Our commitment to excellence is evident in our state-of-the-art facilities, boasting cutting-edge technology for a visually and acoustically immersive experience. 
          From the latest Hollywood blockbusters to independent gems, our diverse selection caters to every taste and preference.
          But we're more than just a place to watch movies – we're a community hub. Join us for special events, exclusive premieres, and film festivals that bring movie enthusiasts together.
          Families are at the heart of our community, and our family-friendly atmosphere ensures that movie nights are cherished moments for all.
          Thank you for making our Cinema a part of your cinematic journey. Lights, camera, action – let the magic unfold at our Cinema!
          </p>
        </div>
      </div>
      <div>
    <h1>Example API</h1>
    <h2>{data.fact}</h2>
  </div>
    </Layout>
  );
};

export default About;
import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { useState, useEffect } from 'react';
import axios from 'axios';
const Contact = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://universities.hipolabs.com/search?country=Kazakhstan');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Layout title={'Contact us'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
          Have questions or need information about our latest screenings and events?
          Feel free to reach out to us anytime – we're here 24/7 to assist you!
          Your cinematic experience is our priority, and we're always available to answer any queries you may have. 
          Explore our website for the latest movie listings, showtimes, and special events.
          For personalized assistance, give us a call or drop us a message.
          We're committed to making your time at our theater enjoyable and hassle-free.
          Lights, camera, action – we're just a click or a call away!
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@cinemawebsite.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +375 (44) 787-4-752
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (free)
          </p>
        </div>
      </div>
      <h1>Example API 2</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </Layout>
  );
};

export default Contact;
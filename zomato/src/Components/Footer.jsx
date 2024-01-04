import React, { useState } from "react";
import axios from 'axios'
import "../Styles/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagramSquare,
  faFacebook,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  const [footerName, setFootername] = useState('')
  const [footerEmail, setFooterEmail] = useState('')
  const [content, setContent] = useState('')

  const contactUs = (e) => {
    e.preventDefault();
    const payload = {
      name: footerName,
      email: footerEmail,
      content
    }
    try {
      axios.post(`http://localhost:8900/contactUs`, payload)
      console.log('Successfull')
      alert('Message has been sent')
      window.location.reload();
    } catch (error) {
      console.log("error : ", error);
    }

  }
  return (
    <div>
      <div className="footer-main">
        <div className="social">
          <h5 className="heading-footer">Social Media</h5>
          <div className="social-icons">
            {" "}
            <a href={"https://twitter.com/"} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faSquareXTwitter} className="icon" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagramSquare} className="icon" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className="icon" />
            </a>
          </div>
        </div>
        <div className="line"></div>
        <div className="contact">
          <h5 className="heading-footer">Contact us</h5>
          <div className="cont-icons">
            <div className="gmail">
            <a href={`mailto:${"xyz123@gmail.com"}`}>
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
              </a>
              <h6 className="gmail">xyz123@gmail.com</h6>
            </div>
            <div className="phone">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <h6 className="phone">9840734531</h6>
            </div>
          </div>
          <div className="cont-det"></div>
        </div>
        <div className="line"></div>

        <div className="address">
          <h5 className="heading-footer">Write to us</h5>
          <p className="addr">
            <form onSubmit={contactUs}>
              <input type="text" placeholder="name" value={footerName} required onChange={e=> setFootername(e.target.value)}/>
              <input type="email" placeholder="email" value={footerEmail} required onChange={e => setFooterEmail(e.target.value)}/>
              <input type="text" placeholder="Write us" value={content} required onChange={e => setContent(e.target.value)}/>
              <button>Send</button>
            </form>
          </p>
        </div>
      </div>
      <div className="copyright">&copy; Edureka Learning Center</div>
    </div>
  );
};

export default Footer;

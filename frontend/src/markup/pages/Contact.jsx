import React from 'react'
import BannerService from '../components/BannerService/BannerService'
import banner1 from "../../assets/images/custom/banner/banner1.jpg"
import Schedule from '../components/features/Schedule'

const Contact = () => {
  return (
    <>
      <BannerService page="Contact Us" bg={banner1} />
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
    
          </div>

          {/* Contact Row */}
          <div className="row clearfix">
            {/* Google Map Section */}
            <section className="map-section col-lg-7">
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3071.2910802067827!2d90.45905169331171!3d23.691532202989123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1577214205224!5m2!1sen!2sbd"
                  width="800"
                  height="500"
                  style={{ border: 0, width: "100%" }}
                  allowFullScreen
                />
              </div>
            </section>

            {/* Info Section */}
            <div className="info-column col-lg-5">
              <div className="inner-column">
                <h4>Our Address</h4>
                <div className="text">
                  Completely synergize resource taxing relationships via premier niche markets. 
                  Professionally cultivate one-to-one customer service.
                </div>
                <ul>
                  <li>
                    <i className="flaticon-pin"></i>
                    <span>Address:</span> 54B, Tailstoi Town 5238 MT, La city, IA 5224
                  </li>
                  <li>
                    <i className="flaticon-email"></i>
                    <span>Email:</span> contact@buildtruck.com
                  </li>
                  <li>
                    <i className="flaticon-phone"></i>
                    <span>Phone:</span> 1800 456 7890 / 1254 897 3654
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Schedule />
    </>
  )
}

export default Contact

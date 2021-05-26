import React from "react";

const About = ({ data }) => {
  if (data) {
    var name = data.name;
    var profilepic = "images/" + data.image;
    var bio = data.bio;
    var resumeDownload = data.resumedownload;
  }

  return (
    <section id="about">
      <div className="row">
          <h2>About Me</h2>
          <p>{bio}</p>
          <div className="row">
            <div className="columns download">
              <p>
                <a href={resumeDownload} className="button">
                  <i className="fa fa-download"></i>Download Resume
                </a>
              </p>
            </div>
          </div>
 
      </div>
    </section>
  );
};

export default About;

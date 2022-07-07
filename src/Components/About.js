import React from "react";
import "./About.css";
export default function About() {
  return (
    <section>
      <div className="about-wrap">
        <p className="text">
          Hi! I'm Agu, a junior web developer diving into the development world
          and loving the journey so far. If you'd like to connect, you can find
          me on Discord (Jin#6139) or these links! :)
        </p>
        <div className="contact">
          <ul className="contact-list">
            <li>
              <a className="linkedIn-link" href="">
                <i className="devicon-linkedin-plain"></i>
              </a>
            </li>
            <li>
              <a className="gh-link" href="https://github.com/jinitsuga">
                <i className="devicon-github-original"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

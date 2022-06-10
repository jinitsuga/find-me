import React from "react";
import "./About.css";
export default function About() {
  return (
    <section>
      <div className="about-wrap">
        <p className="text">
          Hi! I'm Agu, a junior web developer diving into the development world
          and loving the journey so far. If you'd like to connect, you can find
          me on Discord :)
        </p>
        <div className="contact">
          <ul>
            <li> - Discord: Jin#6139</li>
            <li>
              <a className="gh-link" href="https://github.com/jinitsuga">
                - GitHub{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

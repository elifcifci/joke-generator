import React, { useState } from "react";

//Ant-design
import "antd/dist/antd.css";

const Main = () => {
  return (
    <div>
      <section>
        <h1>What is this website?</h1>
        <img
          style={{ width: "100px" }}
          src="./images/chuck-norris.png"
          alt=""
        />
        <div>
          <p>
            This website contains jokes about Chuck Norris, called Chuck Norris
            "facts". Within the site you can find random facts or facts from
            specific categories, temporarily add them to your joke basket or
            permanently save them to your saved facts. Have fun! facts taken
            from{" "}
            <a target="_blank" href="https://api.chucknorris.io/#!">
              chucknorris.io
            </a>
            .
          </p>
        </div>
      </section>

      <section>
        <h1>Who is Chuck Norris?</h1>
        <img
          src="./images/chuck-norris-Evgeny-Yurichev.png"
          alt="from Evgeny Yurichev a Chuck Norris drawing"
        />
        <div>
          <p>
            Chuck Norris is an American martial artist and actor. He is a black
            belt in Tang Soo Do, Brazilian jiu jitsu and judo. Norris won many
            martial arts championships and later founded his own discipline Chun
            Kuk Do. Shortly after, in Hollywood, Norris trained celebrities in
            martial arts.
          </p>
          <a
            title="Go to wikipedia"
            target="_blank"
            href="https://en.wikipedia.org/wiki/Chuck_Norris"
          >
            See more
          </a>
        </div>
      </section>

      <section>
        <h1>About Jokes</h1>
        <img src="./images/blue-chuck-norris-3.png" alt="" />
        <div>
          <p>
            Chuck Norris facts are satirical factoids about martial artist and
            actor Chuck Norris that have become an Internet phenomenon and as a
            result have become widespread in popular culture. The 'facts' are
            normally absurd hyperbolic claims about Norris' toughness, attitude,
            virility, sophistication, and masculinity. Allusions are also
            sometimes made to his use of roundhouse kicks to perform seemingly
            any task, his large amount of body hair with specific regard to his
            beard, and his role in the action television series Walker, Texas
            Ranger.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Main;

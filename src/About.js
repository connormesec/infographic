import React from 'react';

function About() {
  return (
    <div class="contentWrapper">
      <div class="paddingWrapper">
        <p class="p">Before you get started with the infographic generator, there are a few things that are good to know regarding the generator and some of its limitations.</p>
        <p class="h2">Introduction</p>
        <p class="p">The generator allows you to input the PointStreak gamesheet url of a specific hockey game and generate an infographic of a game summary.</p>
        <p class="h2">How it works</p>
        <p class="p">The app works by reading the html from the gamesheet webpage, constructing the image using html and javascript, and finally rendering the png image using html2canvas.</p>
        <p class="h2">Limitations</p>
        <p class="p">The app is designed to only read Pointstreak gamesheets and, as a result, cannot read gamesheets on other websites. The app only reads the information that is presented on the gamesheet; any errors present on the gamesheet will show in the resuting infographic. As it stands, the app cannot read gamesheets that have overtime or shootouts and will return an error if done.</p>
        <p class="h2">Browser compatibility</p>
        <p class="p">The app should work on the following browsers, however, Chrome is the preffered browser.</p>
        <ul class="browserList">
        <li class="browser"><strong>Google Chrome</strong></li>
          <li class="browser">Firefox 3.5+</li>
          <li class="browser">Safari 6+</li>
        </ul>
      </div>
    </div>
  );
}

export default About;

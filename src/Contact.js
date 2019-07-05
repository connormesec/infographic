import React from 'react';

function Contact() {
  return (
    <div class="contentWrapper">
      <div class="paddingWrapper">
      <p class="h2">Thank you for reaching out! Please use this form to report any bugs, broken links, or missing logos.</p>
        <form action="https://formspree.io/connormesec@gmail.com" method="POST">
            <input type="email" name="email" placeholder="Your email" />
            <textarea name="message" placeholder="Message"></textarea>
            <button className="contact" type="submit">Send</button>
        </form>


      </div>
    </div>
  );
}

export default Contact;
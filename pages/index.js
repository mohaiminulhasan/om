import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (city === '') {
      setBtnDisabled(true);

      const data = new FormData(event.target);

      const endpoint = `https://script.google.com/macros/s/AKfycbyJUwDck7KH-Yl3Wjlviujzt-w0RNilPBSuil-UdKHN4wXl3U1BL6M-6_5lduXzgDoDWw/exec`;

      fetch(endpoint, { method: 'POST', body: data })
        .then(res => res.text())
        .then(data => {
          emailjs.send('service_dz1tigs', 'template_u1bse8e', { recipient_email: email }, '7fM0Httn03IJF0K7-')
              .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                setSubmitted(true);
                setName('');
                setEmail('');
                setPhone('');
                setBtnDisabled(false);
              }, function(error) {
                console.log('FAILED...', error);
              });
          })
    }
  }

  const onCityChange = (e) => {
    setCity(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Olive Match - Join the waitlist</title>
        <meta name="description" content="Landing page for Olive Match" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Image 
          src="/images/olivematch_logo_bg.png"
          width={300}
          height={300}
          alt="logo"
          />

        <h1 className='gradient2'>Together forever starts with us</h1>

        <h3 id="join">Join the waitlist!</h3>

        <form onSubmit={handleSubmit}>

          <input className="modhu" type="text" id="city" name="city" placeholder='Your city' onChange={onCityChange} value={city} autoComplete="off" />
          <input type="text" id="name" name="name" placeholder='Your name' required onChange={(e) => setName(e.target.value)} value={name} autoFocus />
          <input type="email" id="email" name="email" placeholder='Your email' required onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="tel" id="phone" name="phone" pattern="\+?([8]{2})?[0][1][0-9]{9}" placeholder='Your mobile' required onChange={(e) => setPhone(e.target.value)} value={phone} />

          <span className={submitted ? '': 'hidden'}>Success. Please check your email for confirmation.</span>

          <button className={ btnDisabled ? 'disabled' : 'active' } type="submit" disabled={btnDisabled}>Join</button>
        </form>

        <span id="first">
          <h2 className='gradient2'>No more mindless swiping</h2>
          <p>Get meaningful, high-quality matches from real people</p>
        </span>

        <span id="second">
          <h2 className='gradient2'>Not looking to meet someone? Perfect.</h2>
          <p>Help your friends tie the knot. They&apos;ll thank you later.</p>
        </span>

        <span id="third">
          <p>Do you have a question for us? We&apos;d love to hear from you. Write to us at <span className='gradient'>
            <Link href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#104;&#101;&#108;&#108;&#111;&#64;&#111;&#108;&#105;&#118;&#101;&#109;&#97;&#116;&#99;&#104;&#46;&#99;&#111;&#109;">&#104;&#101;&#108;&#108;&#111;&#64;&#111;&#108;&#105;&#118;&#101;&#109;&#97;&#116;&#99;&#104;&#46;&#99;&#111;&#109;</Link>
            </span></p>
        </span>
      </main>
      <footer>
        <span id="left-footer">
          <Link className='gradient' target='_blank' href={'http://www.instagram.com/olivematch'}>Instagram</Link>
          <Link className='gradient' target='_blank' href={'http://www.linkedin.com/company/olivematch'}>LinkedIn</Link>
        </span>

        <span id="right-footer">
          <p>&copy; {new Date().getFullYear()} Olive Match</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </span>
      </footer>
    </>
  )
}

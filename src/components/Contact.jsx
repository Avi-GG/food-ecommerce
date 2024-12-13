import React from "react";
import emailjs from "emailjs-com";
import { useState } from "react";

const Contact = () => {
	const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with your EmailJS credentials
    const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
    const USER_ID = process.env.REACT_APP_PUBLIC_KEY;

    emailjs
      .send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name, // Sender's name
          from_email: formData.email, // Sender's email
          message: formData.message, // Message content
        },
        USER_ID
      )
      .then(
        (response) => {
          
            setIsSent(true);
          setTimeout(() => {
            setIsSent(false);
            console.log("SUCCESS!", response.status, response.text);
          }, 5000);

          
          
      },
        (error) => {
          
          console.error("FAILED...", error);
        }
      );

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };



	return (
		<div className="flex w-8/12 mx-auto h-[73vh]">
			<img
				className="w-1/2 p-5 object-cover mr-10"
				src="https://foodfire-app.netlify.app/contactUs.6d5a1f67.png"
				alt=""
			/>
			<div className="w-1/2 flex flex-col justify-center ">
				<h1 className="text-3xl font-semibold text-center">Contact Us</h1>
				<input
					className="border border-[#c5680c] shadow-sm rounded text-sm p-2 mt-5"
					placeholder="Name"
					type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
				/>

				<input
					className="border border-[#c5680c] shadow-sm rounded text-sm p-2 mt-3"
					placeholder="Email"
					
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
				/>
				<textarea
					className="border border-[#c5680c] shadow-sm rounded text-sm p-2 mt-10"
					placeholder="Type your message here ..."
					id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
				></textarea>
				<button  onClick={(e)=>handleSubmit(e)} className={`submit-btn ${isSent && "hidden"} bg-[#c5680c] hover:bg-[#d97919] w-20 py-2 mx-auto rounded mt-3`}>
					Send
				</button>
        {isSent && <div className="success- text-center font-semibold mt-5">Message sent successfully!</div>}
			</div>
		</div>
	);
};

export default Contact;

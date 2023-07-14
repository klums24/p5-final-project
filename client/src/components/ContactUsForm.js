import emailjs from "emailjs-com"
import React from  'react'

function ContactUsForm() {

    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_vmkmdso', 'template_zc2ztxq', e.target, 'XhzAU3bKxuYeJJHsx')
        .then((result) => {
        console.log(result.text);
        }, (error) => {
        console.log(error.text);
        });
    }

    return (
        <div>
            <form onSubmit={sendEmail}>
                <input type="text" placeholder="Name" name="name"/>
                <input type="email" placeholder="Email Address" name="email"/>
                <input type="text" placeholder="Subject" name="subject"/>
                <textarea placeholder="Write your message here" name="message"></textarea>
                <input type="submit" value="Send message"></input>



            </form>
        

        </div>
    )


}

export default ContactUsForm
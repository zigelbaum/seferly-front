import React, { useEffect } from 'react'
import emailjs from '@emailjs/browser';


export default function MailSender() {
    
    let templateParams = {
        name: 'James',
        notes: 'Check this out!',
        subject: "there is a new upload that might interset you",
        user_upload: "user ",
        message: "just uploaded the book ",
        book: "book1",
        user_email: "chanush850@gmail.com"
    };
    
    useEffect(() => {
        sendEmail();
    }, [])

    const sendEmail = () => {
        emailjs.send('service_6vj7mr6', 'template_g4jmzwc', templateParams,'pbcXQ7ERuXK9aFs2q')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }


    return (
        <React.Fragment></React.Fragment>
    )
}

import React, { useEffect } from 'react'
import emailjs from '@emailjs/browser';


export default function MailSender(props) {
    
    let templateParams = {
        subject: " מודעה חדשה שאולי תעניין אותך",
        line1: "שלום ",
        line2: " עלתה עכשיו לאתר מודעה חדשה על הספר",
        line3: ".שנמצא ברשימת המשאלות שלך, ניתן ללכת לבדוק את זה עכשיו באתר",
        line4: " Seferly בברכה צוות",
        name: props.userNmae,
        book: props.bookName,
        user_email: props.userEmail
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

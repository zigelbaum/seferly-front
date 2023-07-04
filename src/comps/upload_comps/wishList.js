import { API_URL, doApiGet } from '../../services/service'
import emailjs from '@emailjs/browser';


export const doApiWish = async (_bookId) => {
    let url = API_URL + "/wishes/bookWishes/" + _bookId;
    try {
        let resp = await doApiGet(url);
        console.log(resp.data);
        resp.data.map(item => {
            sendEmail(item.user_id.fullName.firstName, item.book_id.name, item.user_id.email)
        })
    } catch (err) {
        console.log(err);
        alert("there problem doApi - wishList for book ,try again later")
    }
}

export const sendEmail = (_userName, _bookName, _userEmail) => {

    let templateParams = {
        subject: " מודעה חדשה שאולי תעניין אותך",
        line1: "שלום ",
        line2: " עלתה עכשיו לאתר מודעה חדשה על הספר",
        line3: ".שנמצא ברשימת המשאלות שלך, ניתן ללכת לבדוק את זה עכשיו באתר",
        line4: " Seferly בברכה צוות",
        name: _userName,
        book: _bookName,
        user_email: _userEmail
    };

    emailjs.send('service_6vj7mr6', 'template_g4jmzwc', templateParams, 'pbcXQ7ERuXK9aFs2q')
        .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function (error) {
        console.log('FAILED...', error);
    });
    

}
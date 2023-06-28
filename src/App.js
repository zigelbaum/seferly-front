import './App.css';
// import NewUserTestApp from './TestApps/NewUserTestApp';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Home from './comps/general_comps/home'
import LoginForm from './comps/login_comps/login_form';
import Sign_up_Message from './comps/messages_comps/sign_up_message';
import Login_message from './comps/messages_comps/login_message';
import NewUserForm from './comps/sign_up_comps/new_user_form';
import UsersList from './comps/admin_comps/users_comps/usersList';
import UploadsList from './comps/upload_comps/uploadsList';
import BooksList from './comps/books_comps/booksList';
import UploadForm from './comps/upload_comps/uploadForm';
import NotFound from './comps/general_comps/notFound';
import Footer from './static_comps/footer'
import Header from './static_comps/header';


function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<NewUserForm />} />
        <Route path="/messages/" element={<Sign_up_Message/>} />
        <Route path="/messages/:token" element={<Login_message/>} />
        <Route path="/usersList" element={<UsersList />} />
        <Route path="/uploadsList" element={<UploadsList />} />
        <Route path="/uploadForm" element={<UploadForm />} />
        <Route path="/booksList" element={<BooksList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    {/* <Footer /> */}

    </BrowserRouter>

  );
}

export default App;
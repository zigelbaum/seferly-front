import './App.css';
// import NewUserTestApp from './TestApps/NewUserTestApp';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './comps/general_comps/home'
import LoginForm from './comps/login_comps/login_form';
import Sign_up_Message from './comps/messages_comps/sign_up_message';
import Login_message from './comps/messages_comps/login_message';
import NewUserForm from './comps/sign_up_comps/new_user_form';
import UsersList from './comps/admin_comps/users_comps/usersList';
import UploadsList from './comps/upload_comps/uploadsList';
import BooksList from './comps/books_comps/booksList';
import Header from './static_comps/header';
import Footer from './static_comps/footer';
import NotFound from './comps/general_comps/notFound';
import UploadForm from './comps/upload_comps/uploadForm';
import React, { useState, useMemo } from 'react';
import Logout from './comps/login_comps/logout';
import BookInput from './comps/books_comps/bookInput';
import MyInfo from './comps/user_comps/myInfo';

export const UserContext = React.createContext()

function App() {

  const [isLogedIn, setLogedIn] = useState(false);

  return (
    < UserContext.Provider value={{ isLogedIn, setLogedIn }} >
      <BrowserRouter>
        <div className='App'>
          <Header />
         <div className='content-wrap'>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<NewUserForm />} />
            <Route path="/messages/" element={<Sign_up_Message />} />
            <Route path="/messages/:token" element={<Login_message />} />
            <Route path="/usersList" element={<UsersList />} />
            <Route path="/uploadsList" element={<UploadsList />} />
            <Route path="/uploadForm" element={<UploadForm />} />
            <Route path="/booksList" element={<BooksList />} />
            <Route path="/myInfo" element={<MyInfo />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/bookInput" element={<BookInput />} />
            <Route path='*/:msg' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
</div>
          <Footer />
        </div>
      </BrowserRouter >
    </UserContext.Provider>

  );
}

export default App;
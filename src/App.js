import './App.css';
// import NewUserTestApp from './TestApps/NewUserTestApp';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
// import Home from './comps/home'
import LoginForm from './comps/login_comps/login_form';
import Sign_up_Message from './comps/messages_comps/sign_up_message';
import Login_message from './comps/messages_comps/login_message';
import NewUserForm from './comps/sign_up_comps/new_user_form';
import UsersList from './comps/admin_comps/users_comps/usersList';
import UploadsList from './comps/upload_comps/uploadsList';
import BooksList from './comps/books_comps/booksList';


function App() {
  return (
    <BrowserRouter>

      <header>
        {/* <Link to="/" >home</Link> */}
        <hr/>
        <Link to="/login">login</Link>
        <hr/>
        <Link to="/signUp">signUp</Link>
        <hr/>
        <Link to="/messages">sign up message</Link>
        <hr/>
        <Link to="/messages/:token">log in message</Link>
        <hr/>
        <Link to="/usersList">usersList</Link>
        <hr/>
        <Link to="/uploadsList">uploadsList</Link>
        <hr/>
        <Link to="/booksList">booksList</Link>
      </header>

      <Routes>
        {/* <Route index element={<Home />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signUp" element={<NewUserForm />} />
        <Route path="/messages/" element={<Sign_up_Message/>} />
        <Route path="/messages/:token" element={<Login_message/>} />
        <Route path="/usersList" element={<UsersList />} />
        <Route path="/uploadsList" element={<UploadsList />} />
        <Route path="/booksList" element={<BooksList />} />
        <Route path="/*" element={<div><h2>page not found, 404!</h2></div>} />
      </Routes>

      <footer>
        footer
      </footer>

    </BrowserRouter>

  );
}

export default App;
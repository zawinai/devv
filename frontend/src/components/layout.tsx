import { Routes, Route, Navigate } from "react-router-dom";
// ELements
import Home from "../elements/Home";
import Login from "../elements/login";
import Register from "../elements/register";
import Profile from "../elements/profile";
import Details from "../elements/details";
import WritePost from "../elements/writePost";
import NotFound from "../elements/404";
//Hooks
import PersitToken from "./persitToken";
import { useCT } from "../hooks/useCT";

const Layout = () => {
  const { auth } = useCT();

  console.log(auth);

  return (
    <Routes>
      <Route element={<PersitToken />}>
        <Route path='/' element={<Home />} />
        <Route path='/detail' element={<Details />} />
      </Route>
      {auth?.accessToken ? (
        <Route element={<PersitToken />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/post' element={<WritePost />} />
        </Route>
      ) : (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/*' element={<Navigate to='/' />} />
        </>
      )}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Layout;

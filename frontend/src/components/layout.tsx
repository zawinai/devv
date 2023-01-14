import { Routes, Route } from "react-router-dom";
// ELements
import Home from "../elements/Home";
import Login from "../elements/login";
import Register from "../elements/register";
import AuthUserProfile from "../elements/authUserProfile";
import UserProfile from "../elements/userProfile";
import Details from "../elements/details";
import WritePost from "../elements/writePost";
import EditPost from "../elements/editPost";
import NotFound from "../elements/404";
//Hooks
import PersitToken from "./persitToken";
import { useCT } from "../hooks/useCT";

import { Online, Offline } from "react-detect-offline";

const Layout = () => {
  const { auth } = useCT();

  return (
    <>
      <Online>
        <Routes>
          <Route element={<PersitToken />}>
            <Route path='/' element={<Home />} />
            <Route path='details/:slug' element={<Details />} />
            <Route path='/user/:postusername' element={<UserProfile />} />
            {auth?.accessToken ? (
              <>
                <Route path='/profile' element={<AuthUserProfile />} />
                <Route path='/post' element={<WritePost />} />
                <Route path='/edit/:slug' element={<EditPost />} />
              </>
            ) : (
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </>
            )}
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Online>
      <Offline>
        <div className='min-h-screen flex flex-col items-center justify-center'>
          <h1 className='text-lg sm:text-xl md:text-4xl'>
            No Internet Connection {":("}{" "}
          </h1>
        </div>
      </Offline>
    </>
  );
};

export default Layout;

/*
import { Routes, Route, Navigate, useParams } from "react-router-dom";
// ELements
import Home from "../elements/Home";
import Login from "../elements/login";
import Register from "../elements/register";
import AuthUserProfile from "../elements/authUserProfile";
import UserProfile from "../elements/userProfile";
import Details from "../elements/details";
import WritePost from "../elements/writePost";
import EditPost from "../elements/editPost";
import NotFound from "../elements/404";
//Hooks
import PersitToken from "./persitToken";
import { useCT } from "../hooks/useCT";

const Layout = () => {
  const { auth } = useCT();

  return (
    <Routes>
      <Route element={<PersitToken />}>
        <Route path='/' element={<Home />} />
        <Route path='details/:slug' element={<Details />} />
        <Route path='/user/:postusername' element={<UserProfile />} />
      </Route>
      {auth?.accessToken ? (
        <Route element={<PersitToken />}>
          <Route path='/profile' element={<AuthUserProfile />} />
          <Route path='/post' element={<WritePost />} />
          <Route path='/edit/:slug' element={<EditPost />} />
        </Route>
      ) : (
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </>
      )}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default Layout;

*/

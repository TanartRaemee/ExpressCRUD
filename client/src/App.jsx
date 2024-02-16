import "./App.css";
import FromProduct from "./components/FromProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FromEditProduct from "./components/FromEditProduct";

// layout
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline, Box } from "@mui/material";
import SideBar from "./layout/SideBar";

//pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";

//admin
import HomepageAdmin from "./components/pages/admin/HomepageAdmin";

// user
import HomepageUser from "./components/pages/user/HomepageUser";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import { currentUser } from "./functions/auth";
import { useDispatch } from "react-redux"
import { login as loginRedux } from "./store/userSlice"
import Notfound404 from "./components/pages/Notfound404";

function App() {

  const dispatch = useDispatch()

  const idToken = localStorage.getItem('token')
  console.log('Mytoken',idToken)
  currentUser(idToken).then(res => {
    console.log(res)
    dispatch(loginRedux({
      username: res.data.username,
      role: res.data.role,
      token: idToken,
    }))
  }).catch(err => console.log(err))


  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        {/* // Public routes */}
        <Routes>
          <Route path="*" element={<Notfound404 text="The page you’re looking for doesn’t exist."/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* //User routes */}
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <HomepageUser />
              </UserRoute>
            }
          />

          {/* // Admin routes */}
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomepageAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/viewtable"
            element={
              <AdminRoute>
                <FromProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FromEditProduct />
              </AdminRoute>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;

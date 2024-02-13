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

function App() {
  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <div className="app">
          <SideBar />
          <main className="content">
            <HeaderBar />
            <div className="content_body">
              <Box m="20px">
                <Routes>
                  <Route path="/admin/viewtable" element={<FromProduct />} />
                  <Route path="/edit/:id" element={<FromEditProduct />} />
                  
                </Routes>
              </Box>
            </div>
          </main>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;

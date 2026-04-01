import {BrowserRouter, Routes, Route} from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Jobs from "./pages/Jobs"
import CreateJob from "./pages/CreateJob"
import EditJob from "./pages/EditJob"
import Home from "./pages/Home";
import OfflineBanner from "./pages/OfflineBanner"

function App() {
  return (
    <>
   
    {/* <OfflineBanner /> */}
    <BrowserRouter>
    
      <Routes>

        <Route path="/" element= {< Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element= {< Register />} />

        <Route path="/dashboard" element= {< Dashboard />} />

        <Route path="/jobs" element= {< Jobs />} />

        <Route path="/jobs/create" element= {< CreateJob />} />

        <Route path="/jobs/edit/:id" element={< EditJob />} />

      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
import React, {useState, useEffect} from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Leads from "./components/Leads";

function App() {
  const [leads, setLeads] = useState([]);
  useEffect(() => {

    const fetchLeads = async () => {
      try{

        const res = await axios.get("http://localhost:5000/api/leads");

        setLeads(res.data);

      }
      catch(err){
        console.log(err);
      }
    };

    fetchLeads();

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard leads={leads}/>} />
        <Route path="/leads" element={<Leads leads={leads} setLeads = {setLeads}/>} />
        <Route ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
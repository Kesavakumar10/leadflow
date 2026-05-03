import React, { useState } from "react";
import "./Leads.css";
import Navbar from "./Navbar";
import axios from "axios";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const Leads = ({ leads, setLeads }) => {

  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [course,setCourse] = useState("");
  const [status,setStatus] = useState("New");
  const [followup,setFollowup] = useState("");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("Instagram");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filterSource, setFilterSource] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const addLead = async (e) => {

  e.preventDefault();

  const newLead = {
    name,
    phone,
    course,
    source,
    status,
    followup,
    notes
  };

  try{

    if(editingId){

      const res = await axios.put(
        `http://localhost:5000/api/leads/${editingId}`,
        newLead
      );

      setLeads(leads.map(l => l._id === editingId ? res.data : l));
      setEditingId(null);

    }

    else{

      const res = await axios.post(
        "http://localhost:5000/api/leads",
        newLead
      );

      setLeads(prev => [...prev, res.data]);

    }

  }
  catch(err){
    console.log(err);
  }
  
  setName("");
  setPhone("");
  setCourse("");
  setStatus("New");
  setSource("Instagram");
  setFollowup("");
  setNotes("");
};

  

  const editLead = (index) => {
  const lead = leads[index];

  setName(lead.name);
  setPhone(lead.phone);
  setCourse(lead.course);
  setSource(lead.source);
  setStatus(lead.status);
  setFollowup(lead.followup);
  setNotes(lead.notes);
  setEditingId(lead._id);

};

const deleteLead = async (id) => {

  try{

    await axios.delete(
      `http://localhost:5000/api/leads/${id}`
    );

    setLeads(leads.filter((lead)=>lead._id !== id));

  }
  catch(err){
    console.log(err);
  }

};

  const handleFileUpload = async (e) => {

  const file = e.target.files[0];

  if(!file) return;

  const fileName = file.name.toLowerCase();

  // CSV FILE
  if(fileName.endsWith(".csv") || fileName.endsWith(".txt")){

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function(results){

        const data = results.data;

        await sendToBackend(data);

      }
    });

  }

  // EXCEL FILE
  else if(fileName.endsWith(".xlsx") || fileName.endsWith(".xls")){

    const reader = new FileReader();

    reader.onload = async (event) => {

      const data = new Uint8Array(event.target.result);

      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      await sendToBackend(jsonData);

    };

    reader.readAsArrayBuffer(file);
  }

  else{
    alert("Unsupported file type");
  }

};

  const sendToBackend = async (data) => {

  try{

    // 🔧 modify data before sending
    const updatedData = data.map((item) => ({
      ...item,
      followup: typeof (item.followup || item.Followup) === "number"
        ? new Date(((item.followup || item.Followup) - 25569) * 86400 * 1000)
            .toISOString()
            .split("T")[0]
        : (item.followup || item.Followup)
    }));

    await axios.post("http://localhost:5000/api/leads/bulk", updatedData);

    // refresh leads after upload
    const res = await axios.get("http://localhost:5000/api/leads");

    setLeads(res.data);

    alert("Leads uploaded successfully");

  }
  catch(err){
    console.log(err);
  }

};

<div className="upload-box">
  <label>Upload CSV / Excel</label>

  <input
    type="file"
    accept=".csv, .xlsx, .xls, .txt"
    onChange={handleFileUpload}
  />
</div>

  return (
    <>
    <Navbar />
    <div className="leads-container">

      <h1>Student Leads</h1>

      <form className="lead-form" onSubmit={addLead}>

        <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
        />

        <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        required
        />

        <input
        type="text"
        placeholder="Course Interested"
        value={course}
        onChange={(e)=>setCourse(e.target.value)}
        required
        />

        <select
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Interested</option>
          <option>Not Interested</option>
          <option>Enrolled</option>
        </select>

        <select
        value={source}
        onChange={(e)=>setSource(e.target.value)}
        >
          <option>Instagram</option>
          <option>Website</option>
          <option>Walk-in</option>
          <option>Referral</option>
          <option>WhatsApp</option>
        </select>

        <input
        type="date"
        value={followup}
        onChange={(e)=>setFollowup(e.target.value)}
        />

        <input
        type="file"
        accept=".csv, .xlsx, .xls, .txt"
        onChange={handleFileUpload}
        />

        <button type="submit">
          {editingId ? "Update Lead" : "Add Lead"}
        </button>

      </form>

        <input
        type="text"
        placeholder="Search by name or phone"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="search"
        />

  <div className="filters">

  <select className="filter_source" onChange={(e)=>setFilterSource(e.target.value)}>
    <option value="">All Sources</option>
    <option value="Instagram">Instagram</option>
    <option value="Website">Website</option>
    <option value="Walk-in">Walk-in</option>
    <option value="Referral">Referral</option>
    <option value="Whatsapp">Whatsapp</option>
  </select>

  <select className="filter_status" onChange={(e)=>setFilterStatus(e.target.value)}>
    <option value="">All Status</option>
    <option value="New">New</option>
    <option value="Contacted">Contacted</option>
    <option value="Enrolled">Enrolled</option>
    <option value="Interested">Interested</option>
  </select>

</div>

      <table className="leads-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Status</th>
            <th>Source</th>
            <th>Follow-Up</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {leads
          .filter((lead) => {

  const matchesSearch =
    !search ||
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.phone.includes(search);

  const matchesSource =
    !filterSource || lead.source === filterSource;

  const matchesStatus =
    !filterStatus || lead.status === filterStatus;

  return matchesSearch && matchesSource && matchesStatus;

})
          .map((lead,index)=>(
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.phone}</td>
              <td>{lead.course}</td>
              <td>
                <span className={`status ${lead.status.replace(" ", "-")}`}>
                {lead.status}
                </span>
              </td>
              <td>{lead.source}</td>
              <td>{lead.followup}</td>

              <td>
                <button className = "edit-btn" onClick={()=>editLead(index)}>Edit</button>
                <button className = " dlt-btn" onClick={()=>deleteLead(lead._id)}>Delete</button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
    </>
  );
};

export default Leads;
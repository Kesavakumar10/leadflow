import "./Dashboard.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import GaugeChart from "react-gauge-chart";

const Dashboard = ({leads}) => {

    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const todayFollowups = leads.filter(
        (lead) => lead.followup === today
    ).length;

    const overdue = leads.filter(
        (lead) => lead.followup && lead.followup < today
    ).length;

    const upcoming = leads.filter(
        (lead) => lead.followup && lead.followup > today
    ).length;

    const totalLeads = leads.length;

const enrolledLeads = leads.filter(
  (lead) => lead.status === "Enrolled"
).length;

const percent = totalLeads === 0 ? 0 : enrolledLeads / totalLeads;

  return (
    <>
    <Navbar />
    <div className="dashboard">

      <h1 className="dashboard-title">CRM Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Leads</h3>
          <p>{leads.length}</p>
        </div>

        <div className="card">
          <h3>Follow-ups Today</h3>
          <p>{todayFollowups}</p>
        </div>

        <div className="card">
          <h3>Overdue</h3>
          <p>{overdue}</p>
        </div>

        <div className="card alert">
          <h3>Upcoming</h3>
          <p>{upcoming}</p>
        </div>

      </div> <br></br>

      <div className="gauge-card">

  <h3>Enrollment Progress</h3>

  <GaugeChart
    id="gauge-chart"
    nrOfLevels={20}
    percent={percent}
    colors={["#ff4d4f", "#fadb14", "#52c41a"]}
    arcWidth={0.3}
    textColor="#000"
  />

  <p>{enrolledLeads} / {totalLeads} Enrolled</p>

</div><br></br>

      <button className = "view-student" onClick={()=>navigate("/leads")}>
        View Student Leads
      </button>

    </div>
    </>
  );
};

export default Dashboard;
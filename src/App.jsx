
import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showSignup, setShowSignup] = useState(false);
const [showForm, setShowForm] = useState(false);
const [company, setCompany] = useState('');
const [role, setRole] = useState('');
const [status, setStatus] = useState('Applied');
const [search, setSearch] = useState('');
const [applications, setApplications] = useState(() => {
const savedApplications = localStorage.getItem('applications');

  if (savedApplications !== null) {
    return JSON.parse(savedApplications);
  }

  return [
  {
    id: 1,
    company: 'Infosys',
    role: 'Graduate Engineer Trainee',
    date: '12 Oct 2026',
    status: 'Interview',
    package: '₹4.5 LPA'
  },
  {
    id: 2,
    company: 'Zoho',
    role: 'Software Developer',
    date: '10 Oct 2026',
    status: 'Applied',
    package: '₹6 LPA'
  }
  ]

});
useEffect(() => {
  localStorage.setItem(
    'applications',
    JSON.stringify(applications)
  );
}, [applications]);

function handleAddApplication() {
  if (company.trim() === '' || role.trim() === '') {
    alert('Please enter the company name and job role.');
    return;
  }

  const newApplication = {
    id: Date.now(),
    company: company,
    role: role,
    date: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    status: status,
    package: 'Not specified'
  };

  setApplications([...applications, newApplication]);

  setCompany('');
  setRole('');
  setStatus('Applied');
  setShowForm(false);
}

if (!isLoggedIn) {
  if (showSignup) {
    return (
      <Signup
        onSignup={() => {
          setShowSignup(false);
          alert('Demo signup complete! Please log in.');
        }}
        onSwitchToLogin={() => setShowSignup(false)}
      />
    );
  }

  return (
    <Login
      onLogin={() => setIsLoggedIn(true)}
      onSwitchToSignup={() => setShowSignup(true)}
    />
  );
}



  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">CareerTrack</h2>

        <nav>
          <a className="nav-link active" href="#dashboard">
            Dashboard
          </a>
          <a className="nav-link" href="#applications">
            Applications
          </a>
          <a className="nav-link" href="#interviews">
            Interviews
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">A</div>
          <div>
            <strong>Student Workspace</strong>
            <p>Placement Tracker</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <h1>Good morning, Aarthi 👋</h1>
            <p>Here's your placement progress at a glance.</p>
          </div>
          <span className="today">October 2026</span>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Applications</p>
            <h2>{applications.length}</h2>
            <span>Jobs applied for</span>
          </div>

          <div className="stat-card">
            <p>Interviews Scheduled</p>
            <h2>
  {applications.filter((app) => app.status === 'Interview').length}
</h2>
            <span>Prepare and practice</span>
          </div>

          <div className="stat-card">
            <p>Offers Received</p>
            <h2>
  {applications.filter((app) => app.status === 'Offer').length}
</h2>
            <span>Congratulations!</span>
          </div>

          <div className="stat-card">
            <p>Response Rate</p>
            <h2>38%</h2>
            <span>Company responses</span>
          </div>
        </section>

{showForm && (
  <div className="content-card">
    <h2>Add New Application</h2>

    <input
      type="text"
      placeholder="Company name"
      value={company}
      onChange={(event) => setCompany(event.target.value)}
    />
    <input
  type="text"s
  placeholder="Job role"
  value={role}
  onChange={(event) => setRole(event.target.value)}
/>
<select
  value={status}
  onChange={(event) => setStatus(event.target.value)}
>
  <option value="Applied">Applied</option>
  <option value="Assessment">Assessment</option>
  <option value="Interview">Interview</option>
  <option value="Offer">Offer</option>
  <option value="Rejected">Rejected</option>
</select>


<button
  className="add-button"
  type="button"
  onClick={handleAddApplication}
>
  Save Application
</button>

<button
  type="button"
  onClick={() => setShowForm(false)}
>
  Cancel
</button>

  </div>
)}


        <section className="content-card" id="applications">
          <div className="section-heading">
            <div>
              <h2>Recent Applications</h2>
              <p>Keep track of the jobs you're applying for.</p>
            </div>

            <button
  className="add-button"
  type="button"
  onClick={() => setShowForm(true)}
>
  + Add Application
</button>
          </div>

<input
  type="text"
  placeholder="Search by company or role..."
  value={search}
  onChange={(event) => setSearch(event.target.value)}
/>

<button type="button" onClick={() => setSearch(search.trim())}>
  Search
</button>

          <div className="table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Package</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

{applications
  .filter((application) =>
    application.company.toLowerCase().includes(search.trim().toLowerCase()) ||
    application.role.toLowerCase().includes(search.trim().toLowerCase())
  )
  .map((application) => (

                  <tr key={application.id}>
                    <td className="company-name">
                      {application.company}
                    </td>
                    <td>{application.role}</td>
                    <td>{application.date}</td>

<td>
  <select
    value={application.status}
    onChange={(event) => {
      const newStatus = event.target.value;

      setApplications(
        applications.map((app) =>
          app.id === application.id
            ? { ...app, status: newStatus }
            : app
        )
      );
    }}
  >
    <option value="Applied">Applied</option>
    <option value="Assessment">Assessment</option>
    <option value="Interview">Interview</option>
    <option value="Offer">Offer</option>
    <option value="Rejected">Rejected</option>
  </select>
</td>

                    <td>{application.package}</td>

<td>
  <button
    type="button"
    onClick={() => {
      setApplications(
        applications.filter(
          (app) => app.id !== application.id
        )
      );
    }}
  >
    Delete
  </button>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="footer">
          CareerTrack · Your placement journey, organized.
        </footer>
      </main>
    </div>
  );
}

export default App;

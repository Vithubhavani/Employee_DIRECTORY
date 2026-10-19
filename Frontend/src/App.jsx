
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5001/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  // Fetch employees from the backend
  async function loadEmployees() {
    try {
      const response = await fetch(API);

      if (!response.ok) {
        throw new Error("Could not load employees");
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  // Run when the page opens
  useEffect(() => {
    loadEmployees();
  }, []);

  // Add a new employee
  async function addEmployee(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not add employee");
      }

      setEmployees((previous) => [data, ...previous]);
      setName("");
      setEmail("");
      setRole("");
      setMessage("Employee added successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="container">
      <h1>Company Employee Directory</h1>
      <p>Manage your team in one place.</p>

      <section className="panel">
        <h2>Add Employee</h2>

        <form onSubmit={addEmployee}>
          <input
            placeholder="Employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            placeholder="Job role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />

          <button type="submit">Add Employee</button>
        </form>

        {message && <p>{message}</p>}
      </section>

      <section className="panel">
        <h2>Employees ({employees.length})</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan="4">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default App;

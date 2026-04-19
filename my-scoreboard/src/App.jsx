import { useState } from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";
import "./App.css";

const initialStudents = [
  { id: 1, name: "Aarav Mehta", score: 82 },
  { id: 2, name: "Priya Sharma", score: 35 },
  { id: 3, name: "Rohan Gupta", score: 67 },
  { id: 4, name: "Sneha Verma", score: 55 },
  { id: 5, name: "Karan Malhotra", score: 28 },
];

let nextId = 6;

function App() {
  const [students, setStudents] = useState(initialStudents);

  const handleScoreChange = (id, newScore) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: newScore } : s))
    );
  };

  const handleAdd = ({ name, score }) => {
    setStudents((prev) => [...prev, { id: nextId++, name, score }]);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const passing = students.filter((s) => s.score >= 40).length;
  const failing = students.length - passing;
  const avg = students.length
    ? Math.round(
        students.reduce((sum, s) => sum + s.score, 0) / students.length
      )
    : 0;

  return (
    <div className="app">
      <Header />

      <div className="stats-bar">
        <div className="stat-card">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">{students.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Average Score</div>
          <div className="stat-value">{avg}</div>
        </div>
        <div className="stat-card pass-stat">
          <div className="stat-label">Passing</div>
          <div className="stat-value">{passing}</div>
        </div>
        <div className="stat-card fail-stat">
          <div className="stat-label">Failing</div>
          <div className="stat-value">{failing}</div>
        </div>
      </div>

      <div className="main">
        <StudentTable
          students={students}
          onScoreChange={handleScoreChange}
          onDelete={handleDelete}
        />
        <AddStudentForm onAdd={handleAdd} />
      </div>
    </div>
  );
}

export default App;

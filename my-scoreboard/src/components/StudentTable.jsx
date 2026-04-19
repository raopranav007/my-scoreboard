import { useState } from "react";
import StudentRow from "./StudentRow";

function StudentTable({ students, onScoreChange, onDelete }) {
  const [search, setSearch] = useState("");

  const sorted = [...students].sort((a, b) => b.score - a.score);
  const filtered = sorted.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-section">
      <p className="section-title">All Students ({students.length})</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty-state">No students found.</div>
                </td>
              </tr>
            ) : (
              filtered.map((student) => {
                const globalRank =
                  sorted.findIndex((s) => s.id === student.id) + 1;
                return (
                  <StudentRow
                    key={student.id}
                    student={student}
                    rank={globalRank}
                    onScoreChange={onScoreChange}
                    onDelete={onDelete}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;

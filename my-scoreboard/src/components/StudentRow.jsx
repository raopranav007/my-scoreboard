function StudentRow({ student, rank, onScoreChange, onDelete }) {
  const isPassing = student.score >= 40;

  const rankLabel =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;

  const rankClass =
    rank === 1
      ? "rank rank-gold"
      : rank === 2
      ? "rank rank-silver"
      : rank === 3
      ? "rank rank-bronze"
      : "rank";

  return (
    <tr>
      <td>
        <span className={rankClass}>{rankLabel}</span>
      </td>
      <td>{student.name}</td>
      <td>
        <input
          type="number"
          className="score-input"
          value={student.score}
          min="0"
          max="100"
          onChange={(e) => {
            const val = Math.min(100, Math.max(0, Number(e.target.value)));
            onScoreChange(student.id, val);
          }}
        />
      </td>
      <td>
        <span className={isPassing ? "badge pass" : "badge fail"}>
          {isPassing ? "Pass" : "Fail"}
        </span>
      </td>
      <td>
        <button className="btn-delete" onClick={() => onDelete(student.id)}>
          Remove
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;

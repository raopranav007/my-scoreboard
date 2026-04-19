import { useState } from "react";

function AddStudentForm({ onAdd }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (score === "" || isNaN(score)) errs.score = "Score is required.";
    else if (Number(score) < 0 || Number(score) > 100)
      errs.score = "Score must be 0–100.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onAdd({ name: name.trim(), score: Number(score) });
    setName("");
    setScore("");
    setErrors({});
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="form-section">
      <p className="section-title">Add New Student</p>
      <div className="form-card">
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            placeholder="e.g. Riya Sharma"
            value={name}
            className={errors.name ? "error" : ""}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((p) => ({ ...p, name: "" }));
            }}
          />
          {errors.name && <p className="error-msg">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Score (0 – 100)</label>
          <input
            type="number"
            placeholder="e.g. 75"
            value={score}
            min="0"
            max="100"
            className={errors.score ? "error" : ""}
            onChange={(e) => {
              setScore(e.target.value);
              setErrors((p) => ({ ...p, score: "" }));
            }}
          />
          {errors.score && <p className="error-msg">{errors.score}</p>}
        </div>
        <button className="btn-add" onClick={handleSubmit}>
          + Add Student
        </button>
        {showSuccess && (
          <div className="success-toast">Student added successfully!</div>
        )}
      </div>
    </div>
  );
}

export default AddStudentForm;

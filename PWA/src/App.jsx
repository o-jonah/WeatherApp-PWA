import React from "react";
import "./CapExScorecard.css";

const data = {
  year: 2025,
  totalCapEx: 1250000,
  categories: [
    { type: "Machinery", amount: 350000, ppeScore: 85 },
    { type: "Vehicles", amount: 250000, ppeScore: 75 },
    { type: "Buildings", amount: 450000, ppeScore: 90 },
    { type: "IT Infrastructure", amount: 200000, ppeScore: 70 },
  ],
};

const PPEProgress = ({ score }) => (
  <div className="ppe-progress">
    <div className="progress-bar" style={{ width: `${score}%` }}></div>
    <span>{score}%</span>
  </div>
);

const CapExCategoryCard = ({ category }) => (
  <div className="category-card">
    <h3>{category.type}</h3>
    <p><strong>CapEx:</strong> ${category.amount.toLocaleString()}</p>
    <div>
      <strong>PPE Score:</strong>
      <PPEProgress score={category.ppeScore} />
    </div>
  </div>
);

const CapExScorecard = () => {
  return (
    <div className="scorecard-container">
      <h1>Capital Expenditure Scorecard - {data.year}</h1>
      <div className="summary">
        <strong>Total CapEx:</strong> ${data.totalCapEx.toLocaleString()}
      </div>
      <div className="category-grid">
        {data.categories.map((cat, idx) => (
          <CapExCategoryCard key={idx} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default CapExScorecard;

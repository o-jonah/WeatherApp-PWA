import React, { useState } from "react";

const AssetRow = ({ asset }) => {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <>
      <tr>
        <td>{asset.asset_id}</td>
        <td>{asset.asset_name}</td>
        <td>{asset.acquisition_date}</td>
        <td>{asset.acquisition_cost}</td>
        <td>{asset.useful_life_years}</td>
        <td>{asset.residual_value}</td>
        <td>{asset.depreciation_method}</td>
        <td>{asset.accumulated_depreciation}</td>
        <td>{asset.current_value}</td>
        <td>
          <button onClick={() => setShowSchedule(!showSchedule)}>
            {showSchedule ? "Hide" : "View"}
          </button>
        </td>
      </tr>

      {showSchedule && (
        <tr>
          <td colSpan="10">
            <strong>Depreciation Schedule:</strong>
            <table border="1" cellPadding="5" cellSpacing="0" width="100%">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {asset.schedule.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.year}</td>
                    <td>{entry.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

export default AssetRow;

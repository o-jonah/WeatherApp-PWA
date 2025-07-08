import React, { useRef, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";
import htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import "./CapExChartDashboard.css";

const rawData = {
  "2025": {
    January: [
      { name: "Machinery", value: 80000 },
      { name: "Vehicles", value: 30000 },
      { name: "Buildings", value: 40000 },
      { name: "IT Infrastructure", value: 20000 },
    ],
    February: [
      { name: "Machinery", value: 70000 },
      { name: "Vehicles", value: 25000 },
      { name: "Buildings", value: 50000 },
      { name: "IT Infrastructure", value: 30000 },
    ],
  },
  "2024": {
    January: [
      { name: "Machinery", value: 50000 },
      { name: "Vehicles", value: 15000 },
      { name: "Buildings", value: 30000 },
      { name: "IT Infrastructure", value: 10000 },
    ],
  },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CapExChartDashboard = () => {
  const chartRef = useRef(null);
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("January");
  const [view, setView] = useState("pie");

  const data = rawData[year]?.[month] || [];

  const handleDownload = (type) => {
    if (!chartRef.current) return;
    htmlToImage.toPng(chartRef.current).then((dataUrl) => {
      if (type === "png") {
        const link = document.createElement("a");
        link.download = `CapEx_${year}_${month}.png`;
        link.href = dataUrl;
        link.click();
      } else if (type === "pdf") {
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, "PNG", 15, 15, 180, 160);
        pdf.save(`CapEx_${year}_${month}.pdf`);
      }
    });
  };

  return (
    <div className="dashboard-container">
      <h2>CapEx Overview ({year}, {month})</h2>

      <div className="controls">
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {Object.keys(rawData).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {Object.keys(rawData[year] || {}).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button onClick={() => setView(view === "pie" ? "bar" : "pie")}>
          Toggle to {view === "pie" ? "Bar" : "Pie"} Chart
        </button>

        <button onClick={() => handleDownload("png")}>Download PNG</button>
        <button onClick={() => handleDownload("pdf")}>Download PDF</button>
      </div>

      <div className="chart-wrapper" ref={chartRef}>
        {view === "pie" ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                <LabelList dataKey="value" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default CapExChartDashboard;
      

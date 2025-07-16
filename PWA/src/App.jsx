import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Colors for chart slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CapexPieChart = () => {
  const [chartData, setChartData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const chartRef = useRef(null);

  // Fetch all data on load
  useEffect(() => {
    axios.get('https://yourapi.com/api/financials/capex')
      .then(response => {
        const rawData = response.data.data;
        setAllData(rawData);
        setChartData(groupData(rawData));
      })
      .catch(error => {
        console.error("Error fetching CapEx data:", error);
      });
  }, []);

  // Group data by capexCategory
  const groupData = (data) => {
    const categoryTotals = data.reduce((acc, item) => {
      const category = item.capexCategory;
      acc[category] = (acc[category] || 0) + item.Amount;
      return acc;
    }, {});
    return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
  };

  // Filter handler
  const handleFilter = () => {
    const filtered = allData.filter(item => {
      const date = new Date(item.Posting_Date);
      const yearMatch = selectedYear === 'All' || date.getFullYear().toString() === selectedYear;
      const monthMatch = selectedMonth === 'All' || (date.getMonth() + 1).toString().padStart(2, '0') === selectedMonth;
      return yearMatch && monthMatch;
    });
    setChartData(groupData(filtered));
  };

  // Export as PNG
  const handleExportPNG = () => {
    html2canvas(chartRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'capex-piechart.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  // Export as PDF
  const handleExportPDF = () => {
    html2canvas(chartRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Add title and date
      const title = 'CapEx Distribution Report';
      const dateStr = new Date().toLocaleDateString();
      pdf.setFontSize(16);
      pdf.text(title, 10, 15);
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${dateStr}`, 10, 22);

      // Add chart image
      const imgProps = { width: 180, height: (canvas.height * 180) / canvas.width };
      pdf.addImage(imgData, 'PNG', 10, 30, imgProps.width, imgProps.height);

      pdf.save('capex-piechart.pdf');
    });
  };

  // Tooltip content with % calculation
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
      const percent = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div style={{ backgroundColor: '#fff', padding: 10, border: '1px solid #ccc' }}>
          <strong>{payload[0].name}</strong><br />
          Amount: UGX {payload[0].value.toLocaleString()}<br />
          {percent}%
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>CapEx Distribution by Category</h3>

      {/* Filters */}
      <div style={{ marginBottom: 20 }}>
        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)} style={dropdownStyle}>
          <option value="All">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
        <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} style={dropdownStyle}>
          <option value="All">All Months</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={(i + 1).toString().padStart(2, '0')}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <button onClick={handleFilter} style={buttonStyle}>Apply Filter</button>
      </div>

      {/* Chart wrapped in white box */}
      <div
        ref={chartRef}
        style={{
          display: 'inline-block',
          padding: 20,
          backgroundColor: '#ffffff',
          borderRadius: 8,
          boxShadow: '0 0 5px rgba(0,0,0,0.1)'
        }}
      >
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </div>

      {/* Export Buttons */}
      <div style={{ marginTop: 20 }}>
        <button onClick={handleExportPNG} style={buttonStyle}>Export as PNG</button>
        <button onClick={handleExportPDF} style={buttonStyle}>Export as PDF</button>
      </div>
    </div>
  );
};

// Styles
const buttonStyle = {
  margin: '0 10px',
  padding: '10px 15px',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#0088FE',
  color: '#fff'
};

const dropdownStyle = {
  marginRight: '10px',
  padding: '8px',
  fontSize: '14px'
};

export default CapexPieChart;
  

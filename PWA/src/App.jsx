import React from 'react';

const reportData = [
  {
    id: 1,
    date: '2025-07-06',
    name: 'Q2 Financials',
    type: 'Quarterly Report',
    responsibility: 'John Doe',
    pdfUrl: '/reports/q2-financials.pdf',
    wordUrl: '/reports/q2-financials.docx',
  },
  {
    id: 2,
    date: '2025-07-05',
    name: 'Audit Summary',
    type: 'Audit Report',
    responsibility: 'Jane Smith',
    pdfUrl: '/reports/audit-summary.pdf',
    wordUrl: '/reports/audit-summary.docx',
  },
  // Add more entries as needed
];

const ReportTable = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Report Modification Tracker</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Report Type</th>
              <th className="py-2 px-4 border-b">Responsibility</th>
              <th className="py-2 px-4 border-b">Download</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{report.id}</td>
                <td className="py-2 px-4 border-b">{report.date}</td>
                <td className="py-2 px-4 border-b">{report.name}</td>
                <td className="py-2 px-4 border-b">{report.type}</td>
                <td className="py-2 px-4 border-b">{report.responsibility}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <a
                    href={report.pdfUrl}
                    download
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    PDF
                  </a>
                  <a
                    href={report.wordUrl}
                    download
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Word
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;

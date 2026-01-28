// 📁 app/admin/logs/logs-table.tsx

"use client";

import { useEffect, useState } from "react";

export default function LogsTable() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading logs...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Event</th>
            <th className="p-2">IP</th>
            <th className="p-2">User Agent</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="border-t">
              <td className="p-2">{log.email}</td>
              <td className="p-2">{log.role}</td>
              <td className="p-2">{log.event}</td>
              <td className="p-2">{log.ipAddress}</td>
              <td className="p-2 truncate max-w-xs">
                {log.userAgent}
              </td>
              <td className="p-2">
                {new Date(log.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

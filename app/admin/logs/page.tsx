// app/admin/logs/page.tsx

import LogsTable from "./logs-table";

export default function AdminLogsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Authentication Logs
      </h1>

      <p className="text-sm text-gray-600 mb-6">
        Login metadata collected for security and research purposes.
      </p>

      <LogsTable />
    </div>
  );
}

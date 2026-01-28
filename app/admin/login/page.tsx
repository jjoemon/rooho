
// app/admin/login/page.tsx
import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}

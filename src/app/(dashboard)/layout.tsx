import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerAuth();
  if (!user) redirect("/sign-up");

  return <>{children}</>;
}

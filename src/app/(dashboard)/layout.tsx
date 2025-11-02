import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { generateSlug } from "@/lib/generateSlug";
import Footer from "@/components/Footer";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getServerAuth();
  if (!user) redirect("/sign-up");
  const slug = `create-post/${generateSlug()}`;
  return <>
    <Navbar user={user} slug={slug}/>
    {children}
    <Footer />
  </>;
}

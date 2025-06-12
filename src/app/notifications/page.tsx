import { auth } from "@/auth"; // assuming your next-auth config is at /auth.ts
import Header from "../components/Header";
import { redirect } from "next/navigation";
import NotificationsFeed from "../components/notifications/NotificationsFeed";

async function NotificationsPage() {
  const session = await auth();

  if (!session) {
    redirect("/"); // use next/navigation redirect
  }

  return (
    <>
        <Header label="Notifications" showBackButton />
        <NotificationsFeed />
    </>
  );
}

export default NotificationsPage

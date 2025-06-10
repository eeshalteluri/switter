import Header from "@/src/app/components/Header";
import Form from "./components/Form";
import PostFeed from "./components/posts/PostFeed";

export default function Home() {
  return (
    <div className="text-red-300">
      <>
        <Header label="Home" />
        <Form placeholder="What's happening?"/>
        <PostFeed />
      </>
    </div>
  );
}

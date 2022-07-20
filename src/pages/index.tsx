import type { NextPage } from "next";
import PollPreview from "../components/PollPreview";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-questions"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="py-6 flex flex-col gap-3">
      {data.map(({ question, id, User }) => (
        <PollPreview key={id} title={question} id={id} user={User} />
      ))}
    </div>
  );
};

export default Home;

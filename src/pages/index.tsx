import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);
  const { data: session } = useSession();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Create T3 App</h1>
      <h2>Logged in as ${session?.user?.name}</h2>
      <div>
        {data.map((question) => (
          <div key={question.id}>
            <Link href={`/question/${question.id}`}>
              <a>
                <div key={question.id}>{question.question}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <Link href="/create">
          <a>Create New Poll</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Create T3 App</h1>
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

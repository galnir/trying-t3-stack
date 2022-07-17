import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-questions"]);
  const { data: session } = useSession();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>PollMaker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>
        <div className="container">
          <h1>PollMaker</h1>
          <div>
            {data.map(({ question, id }) => (
              <div key={id}>
                <Link href={`/question/${id}`}>
                  <a>{question}</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

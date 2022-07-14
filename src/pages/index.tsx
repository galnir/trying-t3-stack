import type { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

const QuestionCreator: React.FC = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const client = trpc.useContext();
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess: () => {
      client.invalidateQueries(["questions.get-all-my-questions"]);
      if (!inputRef.current) return;
      inputRef.current.value = "";
    },
  });

  return (
    <input
      ref={inputRef}
      disabled={isLoading}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({ question: event.currentTarget.value });
        }
      }}
    ></input>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all-my-questions"]);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Create T3 App</h1>
      <p>
        {data.map((question) => (
          <>
            <Link href={`/question/${question.id}`} key={question.id}>
              <a>
                <div key={question.id}>{question.question}</div>
              </a>
            </Link>
          </>
        ))}
      </p>
      <QuestionCreator />
    </div>
  );
};

export default Home;

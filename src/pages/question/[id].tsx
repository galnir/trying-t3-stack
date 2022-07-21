import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

const QuestionsPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  const { mutate, data: voteResponse } = trpc.useMutation(
    "questions.vote-on-question",
    {
      onSuccess: () => {
        window.location.reload();
      },
    }
  );

  if ((!isLoading && !data) || error) {
    return <div>Question not found</div>;
  }

  const options = data?.question?.options as any[];
  return (
    <main>
      <div className="m-auto mt-20 rounded-md p-6 bg-slate-600 w-1/2">
        {data?.isOwner && <div>You made this! </div>}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-2xl text-black">{data?.question?.question}</div>
          <div className="mt-10 w-full flex justify-around">
            {options
              ? options.map(({ text }, index) => <div key={index}>{text}</div>)
              : null}
          </div>
        </div>
      </div>
    </main>
  );
};

const QuestionPage: NextPage = () => {
  const { query } = useRouter();
  const { id } = query;

  if (!id || typeof id !== "string") return <div>No ID</div>;

  return <QuestionsPageContent id={id} />;
};

export default QuestionPage;

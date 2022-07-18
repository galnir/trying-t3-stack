import Link from "next/link";

export default function PollPreview({
  id,
  title,
  user,
}: {
  id: string;
  title: string;
  user: { id: string; name: string };
}) {
  return (
    <div className="p-3 bg-red-500 w-1/4 relative">
      <Link href={`/question/${id}`}>
        <a>{title}</a>
      </Link>
      <div className="absolute right-1 bottom-0 text-black">
        <p>{user.name}</p>
      </div>
    </div>
  );
}

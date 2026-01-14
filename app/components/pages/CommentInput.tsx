import Button from "~/components/form/button";

interface CommentProps {
  to: string; // id
  replies?: boolean;
}

export default function CommentInput({ replies = false, to }: CommentProps) {
  return (
    <div className={`flex gap-2 items-center w-full mt-2 ${replies ? "ml-8" : ""}`}>
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all shadow-sm"
        placeholder={`Write a new ${replies ? "Reply" : "Comment"}`}
      />
      <Button size="sm">
        {replies ? "Reply" : "Send"}
      </Button>
    </div>
  );
}

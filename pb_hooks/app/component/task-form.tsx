import pb from "@/core/pb.ts";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function TaskForm() {
  const [task, setTask] = useState("");
  const [error, setError] = useState<unknown>("");
  const navigation = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newTask = await pb.collection("tasks").create({
        task: task,
      });
      if (newTask.status) {
        throw new Error(newTask.message);
      }
      await navigation(location.pathname, { replace: true });
      setTask("");
    } catch (error) {
      console.error(error);
      setError(error);
      setTask("");
    }
  };

  return (
    <>
      <form onSubmit={submit} className="flex items-stretch gap-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          name="task"
          className="min-w-auto w-full h-full p-4 bg-slate-100 focus:bg-slate-200 rounded-full"
          placeholder="New task..."
        />
        <button type="submit" className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="hidden md:inline-block">New Task</span>
        </button>
      </form>
    </>
  );
}

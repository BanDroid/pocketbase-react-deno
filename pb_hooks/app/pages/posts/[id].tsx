import { useParams } from "react-router";
import pb from "@/core/pb.ts";
import { Task } from "@/types/task.ts";
import { useState } from "react";

export default function Page() {
  const [task, setTask] = useState<Task>((window.locals as any).task);
  return (
    <article className="bg-slate-100 p-4 space-y-2 relative">
      <section>{task.task}</section>
      <button
        onClick={async () => {
          const isDeleted = await pb.collection("tasks").delete(task.id);
          if (isDeleted) {
            location.href = "/";
          }
        }}
        className="btn-ghost !px-2 absolute top-0 right-0 m-2 cursor-pointer"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="!size-4 stroke-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      <span className="block w-full h-[1px] bg-slate-200"></span>
      <section className="flex items-center justify-between">
        <span>Completed</span>
        <button
          onClick={async () => {
            const record = await pb.collection("tasks").update<Task>(task.id, {
              is_completed: !task.is_completed,
            });
            setTask(record);
          }}
          className={`w-10 h-6 p-1 bg-slate-300 cursor-pointer relative rounded-full`}
          type="button"
        >
          <span
            className={`block w-4 h-4 p-1 rounded-full absolute top-1/2 left-auto right-auto -translate-y-[50%] transition duration-300 ${
              task.is_completed
                ? "bg-green-500 translate-x-full"
                : "bg-slate-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`!size-full transition duration-100 ${
                task.is_completed ? "scale-100" : "scale-0"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </span>
        </button>
      </section>
    </article>
  );
}

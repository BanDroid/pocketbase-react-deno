import pb from "@/core/pb.ts";
import { useEffect, useState } from "react";
import { ListResult, RecordSubscription } from "pocketbase";
import { Task } from "@/types/task.ts";
import { useNavigate, useSearchParams } from "react-router";

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    perPage: "10",
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const fetchTask = async () => {
    let page = parseInt(searchParams.get("page")!);
    let perPage = parseInt(searchParams.get("perPage")!);
    if (Number.isNaN(page)) {
      page = 1;
      setSearchParams((searchParams) => {
        searchParams.set("page", String(page));
        return searchParams;
      });
    }
    if (Number.isNaN(perPage)) {
      perPage = 10;
      setSearchParams((searchParams) => {
        searchParams.set("perPage", String(perPage));
        return searchParams;
      });
    }
    const res = (await pb.collection("tasks").getList(page, perPage, {
      sort: "-created",
    })) as ListResult<Task>;
    setTasks(res.items);
  };

  useEffect(() => {
    fetchTask().then(() => {
      pb.collection("tasks").subscribe("*", (e: RecordSubscription<Task>) => {
        switch (e.action) {
          case "create": {
            fetchTask();
            break;
          }

          case "delete": {
            const newTasks = tasks.filter((task) => task.id != e.record.id);
            setTasks(newTasks);
            break;
          }

          default: {
            fetchTask();
          }
        }
      });
    });
    return () => {
      pb.collection("tasks").unsubscribe();
    };
  }, [searchParams]);
  return (
    <>
      <ul className="px-4 py-2 my-4 rounded-xl bg-slate-100">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => (location.href = `/posts/${task.id}`)}
            className="flex items-start gap-2 hover:bg-slate-200 active:bg-slate-300 pt-2 ps-2 cursor-pointer"
          >
            {task.is_completed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="stroke-green-500 !size-5 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="!size-5 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
            <span
              className={`block w-full pb-2 border-b-[1px] border-slate-300 ${
                task.is_completed && "completed"
              }`}
            >
              {task.task}
            </span>
          </li>
        ))}
      </ul>
      <section className="flex items-center gap-4">
        <span className="flex-1"></span>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            setSearchParams((searchParams) => {
              searchParams.set(
                "page",
                String(parseInt(searchParams.get("page")!) - 1)
              );
              return searchParams;
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => {
            setSearchParams((searchParams) => {
              searchParams.set(
                "page",
                String(parseInt(searchParams.get("page")!) + 1)
              );
              return searchParams;
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </section>
    </>
  );
}

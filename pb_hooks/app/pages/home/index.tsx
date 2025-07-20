import TaskForm from "../../component/task-form.tsx";
import Tasks from "../../component/task-paginated.tsx";

export default function Page() {
  return (
    <>
      <section>
        <TaskForm />
      </section>
      <section>
        <Tasks />
      </section>
    </>
  );
}

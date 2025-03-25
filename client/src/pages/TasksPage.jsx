import { useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { useTasks } from "../context/TaskProvider";

function TasksPage() {
  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length === 0)
      return <h1 className="text-center text-white">No tasks yet</h1>;
    return tasks.map((task) => <TaskCard task={task} key={task.id} />);
  }

  return (
    <div className="px-4">
      <h1 className="text-5xl text-white font-bold text-center mb-6">Tasks</h1>
      {/* Responsivo: 1 columna en móvil, 2 en tablet y 3 en escritorio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderMain()}
      </div>
    </div>
  );
}

export default TasksPage;

import { useTasks } from "../context/TaskProvider";
import { useNavigate } from "react-router-dom";

function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleTaskDone(task.id);
  };

  return (
    <div className="bg-zinc-700 text-white rounded-md p-4 shadow-md">
      <header className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{task.title}</h2>
        <span className="text-xl">{task.done == 1 ? "✅" : "❌"}</span>
      </header>
      <p className="text-sm mb-2">{task.description}</p>
      <span className="text-xs text-gray-400">{task.createAt}</span>

      {/* Espaciado entre el contenido y los botones */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          className="btn btn-soft border-red-600 btn-error w-full sm:w-1/4 xl:w-auto"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className="btn btn-soft border-yellow-600 btn-warning w-full sm:w-1/4 xl:w-auto"
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className="btn btn-soft border-blue-600 btn-info w-full sm:w-1/4 xl:w-auto"
          onClick={() => handleDone(task.done)}
        >
          Toggle Task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

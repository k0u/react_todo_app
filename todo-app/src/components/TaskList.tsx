import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";

interface TaskListProps {
  completed: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ completed }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);

  const fetchTasks = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/tasks/`);
    setTasks(response.data);
  };

  const handleAddTask = async () => {
    if (newTaskTitle.trim() !== "") {
      await axios.post(`http://127.0.0.1:8000/tasks/`, {
        title: newTaskTitle,
        done_flag: false,
      });
      setNewTaskTitle("");
      setIsAddingTask(false);
      // 新しいタスクを追加した後に再取得
      await fetchTasks();
    }
  };

  useEffect(() => {
    // completed の変更時に再取得
    fetchTasks();
  }, [completed]);

  return (
    <div>
      {completed ? (
        tasks
          .filter((task) => task.done_flag)
          .map((task) => (
            <Task key={task.id} task={task} onUpdate={fetchTasks} />
          ))
      ) : (
        <div>
          <div>
            {isAddingTask ? (
              <div>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
                <button onClick={() => setIsAddingTask(false)}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setIsAddingTask(true)}>＋</button>
            )}
          </div>
          {tasks.length === 0 ? (
            // 画像を表示
            <div>
              <img
                src="./todo.png"
                alt="No tasks"
                style={{ width: "300px", height: "300px" }}
              />
            </div>
          ) : (
            // タスクがある場合はタスクを表示
            tasks
              .filter((task) => !task.done_flag)
              .map((task) => (
                <Task key={task.id} task={task} onUpdate={fetchTasks} />
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;

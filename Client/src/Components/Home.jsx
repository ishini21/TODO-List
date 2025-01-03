import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  // Tab switching logic
  const handleTabs = (tab) => setTab(tab);

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/new-task", { task })
      .then((res) => {
        setTask(""); // Clear input field
        setTodos(res.data); // Update todos list
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  // Fetch all tasks on initial render
  useEffect(() => {
    axios
      .get("http://localhost:5000/read-tasks")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Start editing a task
  const handleEdit = (id, task) => {
    setIsEdit(true);
    setTask(task); // Populate input with the task to edit
    setUpdateId(id); // Store task ID
  };

  // Update an existing task
  const updateTask = () => {
    axios
      .post("http://localhost:5000/update-task", { updateId, task })
      .then(() => {
        setIsEdit(false); // Exit edit mode
        setTask(""); // Clear input field
        setUpdateId(null); // Reset ID

        // Refresh the task list
        axios
          .get("http://localhost:5000/read-tasks")
          .then((res) => setTodos(res.data))
          .catch((err) => console.error("Error refreshing tasks:", err));
      })
      .catch((err) => console.error("Error updating task:", err));
  };
  const handleDelete = (id) => {
    //console.log(id);
    axios.post('http://localhost:5000/delete-task',{id})
    .then(res => {
      setTodos(res.data)
    })
  }
  const handleComplete = (id) => {
    axios.post('http://localhost:5000/complete-task',{id})
    .then(res => {
      setTodos(res.data)
    })
  }

  return (
    <div className="bg-green-100 w-screen h-screen ">
      <div className="flex flex-col w-screen h-screen justify-center items-center ">
        <div>
          <h2 className="font-bold text-2xl mb-3">TODO-List</h2>
        </div>

        {/* Input and Add/Update Button */}
        <div className="flex gap-3">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter todo"
            className="w-64 p-2 outline-none border border-blue-300 rounded-md"
          />
          <button
            onClick={isEdit ? updateTask : handleAddTask}
            className="bg-green-600 text-white px-4 rounded-md"
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex text-sm w-80 justify-evenly mt-4">
          <p
            onClick={() => handleTabs(1)}
            className={`${
              tab === 1 ? "text-blue-700" : "text-black"
            } cursor-pointer`}
          >
            All
          </p>
          <p
            onClick={() => handleTabs(2)}
            className={`${
              tab === 2 ? "text-blue-700" : "text-black"
            } cursor-pointer`}
          >
            Active
          </p>
          <p
            onClick={() => handleTabs(3)}
            className={`${
              tab === 3 ? "text-blue-700" : "text-black"
            } cursor-pointer`}
          >
            Completed
          </p>
        </div>

        {/* Task List */}
       { tab == 1 && todos?.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between bg-white p-3 w-80 rounded-sm mt-4"
          >
            <div>
              <p className="text-lg font-semibold">{todo.task}</p>
              <p className="text-xs text-gray-600">
                {todo.createdAt
                  ? new Date(todo.createdAt).toLocaleString()
                  : "No date available"}
              </p>
              <p className="text-sm text-gray-600">Status:{todo.status}</p>
            </div>
            <div className="flex flex-col text-sm justify-start items-start">
              <button
                className="text-orange-600 cursor-pointer"
                onClick={() => handleEdit(todo.id, todo.task)}
              >
                Edit
              </button>
              <button className="text-red-600 cursor-pointer"onClick={() => handleDelete(todo.id)} >Delete</button>
              <button className="text-blue-600 cursor-pointer"onClick={() => handleComplete(todo.id)}>Completed</button>
            </div>
          </div>
        ))}
       

{
        tab == 2 && todos?.filter(todo => todo.status == 'active').map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between bg-white p-3 w-80 rounded-sm mt-4"
          >
            <div>
              <p className="text-lg font-semibold">{todo.task}</p>
              <p className="text-xs text-gray-600">
                {todo.createdAt
                  ? new Date(todo.createdAt).toLocaleString()
                  : "No date available"}
              </p>
              <p className="text-sm text-gray-600">Status:{todo.status}</p>
            </div>
            <div className="flex flex-col text-sm justify-start items-start">
              <button
                className="text-orange-600 cursor-pointer"
                onClick={() => handleEdit(todo.id, todo.task)}
              >
                Edit
              </button>
              <button className="text-red-600 cursor-pointer"onClick={() => handleDelete(todo.id)} >Delete</button>
              <button className="text-blue-600 cursor-pointer"onClick={() => handleComplete(todo.id)}>Completed</button>
            </div>
          </div>
        ))}
          {
        tab == 3 && todos?.filter(todo => todo.status == 'completed').map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between bg-white p-3 w-80 rounded-sm mt-4"
          >
            <div>
              <p className="text-lg font-semibold">{todo.task}</p>
              <p className="text-xs text-gray-600">
                {todo.createdAt
                  ? new Date(todo.createdAt).toLocaleString()
                  : "No date available"}
              </p>
              <p className="text-sm text-gray-600">Status:{todo.status}</p>
            </div>
            <div className="flex flex-col text-sm justify-center items-center">
             
              <button className="text-red-600 cursor-pointer"onClick={() => handleDelete(todo.id)} >Delete</button>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


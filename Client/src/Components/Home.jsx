import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState(null);
  const [todos, setTodos] = useState(null);
  const [isEdit,setIsEdit] = useState(false);


  const handleTabs = (tab) => {
    setTab(tab);
    //console.log(tab);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    // console.log(task);
    axios.post("http://localhost:5000/new-task", { task })
    .then(res => {
      setTask(null)
      setTodos(res.data);
    })
  }
  useEffect(() => {
    axios.get("http://localhost:5000/read-tasks")
        .then((res) => setTodos(res.data))
        .catch((err) => console.error(err));
}, []);


  // useEffect(() => {
  //   axios.get("http://localhost:5000/read-tasks")
  //    .then((res) => {
  //     setTodos(res.data)
  //   });
  // },[]);

  const handleEdit = (id,task) => {
    isEdit(true)
    //console.log(id);
    setTask(task)

    axios.post('http://localhost:5000/update-task',{task})

  }

  return (
    <div className="bg-green-100 w-screen h-screen">
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div>
          <h2 className="font-bold text-2xl mb-3">TODO-List</h2>
        </div>
        <div className="flex gap-3">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter todo"
            className="w-64 p-2 outline-none border border-blue-300 rounded-md"
          ></input>
          <button
            onClick={handleAddTask}
            className="bg-green-600 text-white px-4 rounded-md "
          >
           {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="flex text-sm w-80 justify-evenly mt-4 ">
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
        {todos?.map((todo, index) => (
          <div
            key={todo.id || index}
            className="flex justify-between bg-white p-3 w-80 rounded-sm mt-4"
          >
            <div>
              <p className="text-lg font-semibold">{todo.task}</p>
              <p className="text-xs text-gray-600">
                {todo.createdAt
                  ? new Date(todo.createdAt).toLocaleString()
                  : "No date available"}
              </p>
              <p className="text-sm text-gray-600">Status: Active</p>
            </div>
            <div className="flex flex-col text-sm justify-start items-start">
              <button className="text-orange-600 cursor-pointer"onClick={() => handleEdit(todo.id,todo.task)}>Edit</button>
              <button className="text-red-600 cursor-pointer">Delete</button>
              <button className="text-blue-600 cursor-pointer">Completed</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

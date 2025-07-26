import React, { useState } from "react";
import useTaskStore from "../store";

const TaskEditor = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const add = useTaskStore((state) => state.add);
  const edit = useTaskStore((state) => state.edit);
  const deleteTask = useTaskStore((state) => state.delete);

  const [inputvalue, setInputvalue] = useState("");
  const [editId, seteditId] = useState(null);
  const [status, setstatus] = useState("pending");
  const [filterStatus, setFilterStatus] = useState("all");

  //   add = useTaskStore((state) => state.add);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editId === null) {
      // you're adding a new task.
      add(inputvalue, status);
      setInputvalue("");
      setstatus("pending");
    } else {
      // updating a task.
      edit(editId, inputvalue, status);
      seteditId(null);
      setInputvalue("");
      setstatus("pending");
    }
  };

  const handleInput = (e) => {
    const newInputValue = e.target.value;
    setInputvalue(newInputValue);
    // console.log(newInputValue);
  };

  const handleEdit = (task) => {
    setInputvalue(task.title);
    setstatus(task.status);
    seteditId(task.id);
  };

  const handleDlt = (task) => {
    deleteTask(task.id);
  };

  const filteredData = tasks.filter((task) =>
    filterStatus === "all" ? true : task.status === filterStatus
  );

  return (
    <>
      <form action="" onSubmit={handleFormSubmit}>
        <input
          value={inputvalue}
          onChange={handleInput}
          type="text"
          placeholder="Enter Task"
        />
      </form>

      <ul>
        {filteredData.map((task) => (
          <React.Fragment key={task.id}>
            <div>
              <li>{task.title}</li>
              <p>{task.status}</p>

              <button onClick={() => handleEdit(task)}>EDIT</button>
              <button onClick={() => handleDlt(task)}>DELETE</button>
            </div>
          </React.Fragment>
        ))}
      </ul>
      <select onChange={(e) => setFilterStatus(e.target.value)} name="" id="">
        <option value="all">All</option>

        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </>
  );
};

export default TaskEditor;

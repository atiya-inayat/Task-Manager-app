import React, { useState, useEffect } from "react";
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
  // const [checked, setChecked] = useState(false);

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

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("tasks"));
    if (savedTask) {
      savedTask.forEach((task) => add(task.title, task.status));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  const handleCheckbox = (task) => {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    edit(task.id, task.title, newStatus);
  };

  return (
    <>
      <div className="container">
        <h1>Your Task Manager</h1>

        <div className="main-container">
          <div className="task-container">
            <form action="" onSubmit={handleFormSubmit}>
              <input
                className="input"
                value={inputvalue}
                onChange={handleInput}
                type="text"
                placeholder="Enter Task"
              />
            </form>

            <ul>
              {filteredData.map((task) => (
                <React.Fragment key={task.id}>
                  <div className="task-data-cont">
                    <div className="data">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={task.status === "completed"}
                        onChange={() => handleCheckbox(task)}
                      />

                      <h3
                        className={
                          task.status === "completed" ? "completed" : ""
                        }
                      >
                        {task.title}
                      </h3>
                      <p
                      // className={
                      //   task.status === "completed" ? "completed" : ""
                      // }
                      >
                        {task.status}
                      </p>
                    </div>
                    <div className="btn-cont">
                      <button
                        className="button"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="button dlt-btn"
                        onClick={() => handleDlt(task)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </ul>
          </div>
          {/* // --------------- */}
          <div className="selector-container">
            <select
              className="selector"
              onChange={(e) => setFilterStatus(e.target.value)}
              name=""
              id=""
            >
              <option value="all">All</option>

              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskEditor;

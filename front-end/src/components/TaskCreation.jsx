import React from "react";
import axios from "axios";

const initialItem = {
    title: "",
    description: "",
    priority: "Normal",
    dueDate: new Date().toISOString().slice(0, 10),
};

const TaskCreation = ({ update, setUpdate }) => {
    const [item, setItem] = React.useState(initialItem);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setItem({
            ...item,
            [name]: value,
        });
    };

    const handleAddTask = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:9000/api/tasks", item)
            .then((response) => {
                setItem(initialItem);
                // setTasks([...tasks, response?.data])
                // const newUpdate = update + 1;
                setUpdate(!update);
            })
            .catch((error) => {
                alert("Add task failed: " + error?.response?.data?.message);
                console.log(error);
            });
    };

    return (
        <form id="task-creation" onSubmit={handleAddTask}>
            <h2 className="component-title">New Task</h2>
            <input
                type="text"
                className="form-input"
                placeholder="Add new task ..."
                value={item.title}
                onChange={handleInputChange}
                name="title"
                required
            />

            <p className="input-title">Description</p>
            <textarea
                className="form-input"
                value={item.description}
                onChange={handleInputChange}
                name="description"
            ></textarea>

            <div className="row">
                <div className="col l-6 m-12 c-12">
                    <p className="input-title">Due date</p>
                    <input
                        type="date"
                        name="dueDate"
                        className="form-input"
                        value={item.dueDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                    />
                </div>
                <div className="col l-6 m-12 c-12">
                    <p className="input-title">Piority</p>
                    <select
                        name="priority"
                        onChange={handleInputChange}
                        className="select-input"
                    >
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                        <option value="High">High</option>
                    </select>
                </div>
            </div>

            <button type="submit" className="submit-btn">
                Add
            </button>
        </form>
    );
};

export default TaskCreation;

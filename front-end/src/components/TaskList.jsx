import React from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, update, setUpdate }) => {
    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [deleteArr, setDeleteArr] = React.useState([]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value.length > 0) {
            const newTaskList = tasks.filter((task) => {
                const taskTitle = task.title.toLowerCase();
                return taskTitle.includes(e.target.value.toLowerCase());
            });
            setSearchResult(newTaskList);
        }
    };

    const handleRemoveMultipleTask = () => {
        if (window.confirm("Are you sure to remove all this task?") === true) {
            axios
                .delete(
                    `http://localhost:9000/api/tasks/delete-many/${deleteArr}`
                )
                .then((response) => {
                    setUpdate(!update);
                    setDeleteArr([]);
                })
                .catch((error) => {
                    alert("Remove task failed: " + error?.response?.data?.message);
                    console.log(error);
                });
        }
    };

    return (
        <div id="task-list">
            <h2 className="component-title">To do list</h2>
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                className="form-input"
                placeholder="Search ..."
            />

            <div className="item-list">
                {tasks &&
                    search.length === 0 &&
                    tasks.map((task) => (
                        <TaskItem
                            task={task}
                            key={task._id}
                            update={update}
                            setUpdate={setUpdate}
                            deleteArr={deleteArr}
                            setDeleteArr={setDeleteArr}
                        />
                    ))}
                {searchResult &&
                    search.length > 0 &&
                    searchResult.map((task) => (
                        <TaskItem
                            task={task}
                            key={task._id}
                            update={update}
                            setUpdate={setUpdate}
                            deleteArr={deleteArr}
                            setDeleteArr={setDeleteArr}
                        />
                    ))}
            </div>
            {deleteArr.length > 0 && (
                <div className="bulk-action">
                    <div className="row">
                        <p className="task-title col l-6 m-6 c-12">
                            Bulk action
                        </p>
                        <div className="col l-3 m-3 c-6">
                            <button
                                className="detail-btn"
                                // onClick={() => setShowDetail(!showDetail)}
                            >
                                Done
                            </button>
                        </div>
                        <div className="col l-3 m-3 c-6">
                            <button
                                className="remove-btn"
                                onClick={() => handleRemoveMultipleTask()}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskList;

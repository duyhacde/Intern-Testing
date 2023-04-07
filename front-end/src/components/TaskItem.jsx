import React from "react";
import axios from "axios";
import TaskDetail from "./TaskDetail";

const TaskItem = ({ task, update, setUpdate, deleteArr, setDeleteArr }) => {
    const [showDetail, setShowDetail] = React.useState(false);

    const handleRemoveTask = (taskId) => {
        if (window.confirm("Are you sure to remove this task?") === true) {
            axios
                .delete(`http://localhost:9000/api/tasks/${taskId}`)
                .then((response) => {
                    setUpdate(!update);
                })
                .catch((error) => {
                    alert("Remove task failed: " + error?.response?.data?.message);
                    console.log(error);
                });
        }
    };

    const handleCheckTask = (e) => {
        if (e.target.checked) {
            setDeleteArr([...deleteArr, e.target.value]);
        } else {
            setDeleteArr(
                deleteArr.filter((taskId) => taskId !== e.target.value)
            );
        }
    };

    return (
        <div>
            <div id="task-item">
                <div className="row">
                    <div className="checkbox-input col l-1 m-1 c-1">
                        <input
                            type="checkbox"
                            value={task._id}
                            onClick={handleCheckTask}
                        />
                    </div>
                    <p className="task-title col l-5 m-5 c-11">{task.title}</p>
                    <div className="col l-3 m-3 c-6">
                        <button
                            className="detail-btn"
                            onClick={() => setShowDetail(!showDetail)}
                        >
                            Detail
                        </button>
                    </div>
                    <div className="col l-3 m-3 c-6">
                        <button
                            className="remove-btn"
                            onClick={() => handleRemoveTask(task._id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            {showDetail && (
                <TaskDetail task={task} update={update} setUpdate={setUpdate} />
            )}
        </div>
    );
};

export default TaskItem;

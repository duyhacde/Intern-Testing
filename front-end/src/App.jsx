import React from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskCreation from "./components/TaskCreation";

function App() {
    const [tasks, setTasks] = React.useState([]);
    const [update, setUpdate] = React.useState(true);

    React.useEffect(() => {
        axios
            .get("http://localhost:9000/api/tasks")
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [update]);

    return (
        <div className="grid wide">
            <div className="row">
                <div className="col l-6 m-12 c-12">
                    <TaskCreation update={update} setUpdate={setUpdate} />
                </div>
                <div className="col l-6 m-12 c-12">
                    <TaskList
                        tasks={tasks}
                        update={update}
                        setUpdate={setUpdate}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;

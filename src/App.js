import { useEffect, useState } from "react";
import { TaskRow } from "./components/TaskRow";
import { TaskBanner } from './components/TaskBanner';
import {TaskCreator} from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';

function App() {
  const [userName, setUserName] = useState("Francisco");
  const [taskItems, setTaskItems] = useState([
    {
      name: "Task One",
      done: false,
    },
    {
      name: "Task Two",
      done: false,
    },
    {
      name: "Task Three",
      done: false,
    },
    {
      name: "Task Four",
      done: false,
    },
  ]);

  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(() => {
    let data = localStorage.getItem('tasks')
    if(data != null) {
      setTaskItems(JSON.parse(data))
    } else {
      setUserName('Franco Example')
      setTaskItems([
        {
          name: "Task One Example",
          done: false,
        },
        {
          name: "Task Two Example",
          done: false,
        },
        {
          name: "Task Three Example",
          done: false,
        },
        {
          name: "Task Four Example",
          done: false,
        },
      ])
      setShowCompleted(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('taks', JSON.stringify(taskItems))
  }, [taskItems])

  const createNewTask = (taskName) => {
    if(!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, {name: taskName, done: false}]); 
      // Hacemos copia del array con los "..."
    }
  }

  const toggleTask = (task) => {
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  };

  const taskTableRows = (doneValue) => {
    return taskItems
    .filter(task => task.done === doneValue)
    .map((task) => (
      <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
    ));
  };

  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems}/>
      <TaskCreator createNewTask={createNewTask}/>
      <div className="p-4">
        <table className="table table-striped table-borderless">
          <thead>
            <tr>
              <th>Info</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{taskTableRows(false)}</tbody>
        </table>
      </div>
      

      <div className="bg-primary text-white text-center p-4">
        <VisibilityControl 
        isChecked={showCompleted}
        callback={checked => setShowCompleted(checked)}/>
      </div>
      {
        showCompleted && (
          <div className="p-4">
            <table className="table table-striped table-borderless">
            <thead>
              <tr>
                <th>Info</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
          </div>
        )
      }
    </div>
  );
}

export default App;

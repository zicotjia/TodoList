import React from "react";
import Task from "./task";
import Bottom from "./bottom";

function List(props) {
  var tasks;

  //filter tasks by category
  if (props.category !== "ALL") {
    tasks = props.data.filter((data) => data.category === props.category);
  } else {
    tasks = props.data.filter((data) => data.category !== "COMPLETED");
  }

  return (
    <div className="flex">
      <div className="Box" id="heading">
        {props.deletemode ? <h2>Delete Task</h2> : <h2>{props.category}</h2>}
      </div>

      {tasks &&
        tasks.map((task, index) => {
          return (
            <Task
              key={task.id}
              title={task.title}
              description={task.description}
              date={task.date}
              time={task.time}
              id={task.id}
              userid={task.userid}
              showadd={props.showadd}
              setShowAdd={props.setShowAdd}
              deletemode={props.deletemode}
              tasks={props.tasks}
              setTask={props.setTask}
              editmode={props.editmode}
              setEditMode={props.setEditMode}
              editid={props.editid}
              setEditId={props.setEditId}
              currenttask={props.currenttask}
              setCurrentTask={props.setCurrentTask}
            />
          );
        })}

      <Bottom
        showadd={props.showadd}
        setShowAdd={props.setShowAdd}
        deletemode={props.deletemode}
        setDeleteMode={props.setDeleteMode}
        editmode={props.editmode}
        setEditMode={props.setEditMode}
      />
    </div>
  );
}

export default List;

import React from "react";
import Task from "./task";
import Bottom from "./bottom";

function List(props) {
  console.log(props.data);
  var tasks;
  if (props.category !== "ALL") {
    tasks = props.data.filter((data) => data.category === props.category);
  } else {
    tasks = props.data.filter((data) => data.category !== "COMPLETED");
  }
  console.log(tasks);

  console.log("Hello world");
  return (
    <div className="flex">
      <div className="Box" id="heading">
        {props.deletemode ? <h2>Delete Task</h2> : <h2>{props.category}</h2>}
      </div>

      {tasks &&
        tasks.map((tasks, index) => {
          return (
            <Task
              key={tasks.id}
              title={tasks.title}
              description={tasks.description}
              date={tasks.date}
              time={tasks.time}
              id={tasks.id}
              userid={tasks.userid}
              showadd={props.showadd}
              setShowAdd={props.setShowAdd}
              deletemode={props.deletemode}
              tasks={props.tasks}
              setTask={props.setTask}
              editmode={props.editmode}
              setEditMode={props.setEditMode}
              editid={props.editid}
              setEditId={props.setEditId}
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

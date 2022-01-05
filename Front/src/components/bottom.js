import React from "react";

function Bottom(props) {
  function handleAdd() {
    if (!props.editmode) {
      props.setShowAdd(!props.showadd);
    } else {
      console.log("cant do that");
    }
  }

  function handleDel() {
    props.deletemode ? props.setDeleteMode(false) : props.setDeleteMode(true);
    console.log("hello");
  }

  return (
    <div className="Box" id="bottom">
      <div className="left" onClick={handleAdd}>
        <h4>Add Task</h4>
      </div>
      <span class="middleLine"></span>
      <div className="right" onClick={handleDel}>
        <h4>Delete Task</h4>
      </div>
    </div>
  );
}

export default Bottom;

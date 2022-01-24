import React from "react";

function Bottom(props) {
  //initiate add mode
  function initAdd() {
    if (!props.editmode) {
      props.setShowAdd(!props.showadd);
    } else {
      console.log("cant do that");
    }
  }

  //ditto delete mode
  function initDel() {
    props.deletemode ? props.setDeleteMode(false) : props.setDeleteMode(true);
  }

  return (
    <div className="Box" id="bottom">
      <div className="left" onClick={initAdd}>
        <h4>Add Task</h4>
      </div>
      <span class="middleLine"></span>
      <div className="right" onClick={initDel}>
        <h4>Delete Task</h4>
      </div>
    </div>
  );
}

export default Bottom;

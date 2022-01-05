import React, { useEffect, useState } from "react";
import axios from "axios";

function Task(props) {
  const [hovered, setHovered] = useState(false);
  const [edititem, setEditItem] = useState(false);

  function toggleHoverOn() {
    setHovered(true);
  }

  function toggleHoverOff() {
    setHovered(false);
  }

  async function handleDel(event) {
    console.log(props.id);
    await axios.delete("http://localhost:8080/task/delete/" + props.id, {
      mode: "cors",
    });
    props.setTask(props.tasks.filter((task) => task.id !== props.id));
  }

  const dates = new Date(props.date).toLocaleDateString();

  var times = props.time;
  times = times.substring(11, times.length - 4);

  function initEdit() {
    if (!props.showadd) {
      props.setEditMode(!props.editmode);
      props.setEditId(props.id);
      setEditItem(!edititem);
    } else {
      console.log("cant do that");
    }
  }

  useEffect(() => {
    console.log(props.editid);
  }, [props.editid]);

  return (
    <div
      className={
        edititem
          ? "Box darkened"
          : hovered
          ? props.deletemode
            ? "Box crossed"
            : "Box darkened"
          : "Box"
      }
      id="item"
      onClick={props.deletemode ? handleDel : initEdit}
      onMouseOver={toggleHoverOn}
      onMouseLeave={toggleHoverOff}
    >
      <div>
        <h4>
          <strong>{props.title}</strong>
        </h4>
        <h5>{props.description}</h5>
      </div>
      <div>
        <h5>{dates}</h5>
        <h5>{times}</h5>
      </div>
    </div>
  );
}

export default Task;

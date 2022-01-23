import React, { useState } from "react";
import axios from "axios";

function Task(props) {
  var url = "https://murmuring-earth-95812.herokuapp.com/";

  const [hovered, setHovered] = useState(false);
  const [edititem, setEditItem] = useState(false);

  var dates = new Date(props.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  var times = props.time;
  times = times.substring(11, times.length - 4);
  times = "2020-01-01T" + times;

  var ftimes = new Date(times).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  var taskday = new Date(props.date).toLocaleDateString();
  var presentday = new Date().toLocaleDateString();

  const sameday = presentday === taskday;
  const pastday = presentday > taskday;

  var tasktime = new Date(times);
  var presenttime = new Date();

  const pasttime =
    tasktime.getHours() < presenttime.getHours() ||
    (tasktime.getHours() === presenttime.getHours() &&
      tasktime.getMinutes() < presenttime.getMinutes()) ||
    (tasktime.getHours() === presenttime.getHours() &&
      tasktime.getMinutes() === presenttime.getMinutes() &&
      tasktime.getSeconds() < presenttime.getSeconds());

  const pastdeadline = (sameday && pasttime) || pastday;

  function toggleHoverOn() {
    setHovered(true);
  }

  function toggleHoverOff() {
    setHovered(false);
  }

  async function handleDel(event) {
    await axios.delete(url + "task/delete/" + props.id, {
      mode: "cors",
    });
    props.setTask(props.tasks.filter((task) => task.id !== props.id));
  }

  function initEdit() {
    if (!props.showadd) {
      props.setEditMode(!props.editmode);

      var current;

      for (var i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].id === props.id) {
          current = props.tasks[i];
          break;
        }
      }
      props.setCurrentTask(current);
      setEditItem(!edititem);
    } else {
      console.log("cant do that");
    }
  }

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
      <div className={pastdeadline ? "past" : sameday ? "imminent" : undefined}>
        <h4>
          <strong>{props.title}</strong>
        </h4>
        <h5>{props.description}</h5>
      </div>
      <div className={pastdeadline ? "past" : sameday ? "imminent" : undefined}>
        <h5>{dates}</h5>
        <h5>{ftimes}</h5>
      </div>
    </div>
  );
}

export default Task;

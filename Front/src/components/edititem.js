import React from "react";
import axios from "axios";

function Edititem(props) {
  var url = "https://murmuring-earth-95812.herokuapp.com/";

  const current = props.currenttask;

  //replace old task with edited version
  function taskreplacement(newtask) {
    for (var i = 0; i < props.tasks.length; i++) {
      if (props.tasks[i].id === newtask.id) {
        props.tasks[i] = newtask;
        break;
      }
    }
  }

  //create an edited task after edit submission
  function editmaker(event) {
    const val = event.target;
    var ftitle;
    var fdescription;
    var fdate;
    var ftime;

    if (val[0].value === "") {
      ftitle = current.title;
    } else {
      ftitle = val[0].value;
    }

    if (val[1].value === "") {
      fdescription = current.description;
    } else {
      fdescription = val[1].value;
    }

    if (val[3].value === "") {
      fdate = current.date;
    } else {
      fdate = val[3].value;
    }

    if (val[4].value === "") {
      ftime = current.time.substring(11, current.time.length - 4);
    } else {
      ftime = val[4].value;
    }

    var edit = {
      title: ftitle,
      description: fdescription,
      category: val[2].value,
      id: current.id,
      date: fdate,
      time: ftime,
      userid: current.userid,
    };

    edit.date = new Date(edit.date).toLocaleDateString();
    return edit;
  }

  //Patch request edited item
  async function handleEditSubmit(event) {
    const edit = editmaker(event);

    console.log(edit);
    axios
      .patch(url + "task/entry/" + current.id, edit, {
        header: { "content-type/json": "application/json" },
      })
      .then(() => taskreplacement(edit));
    //immediately update task instead of calling GET
  }

  return (
    <div className="box">
      <form onSubmit={handleEditSubmit}>
        <div className="Box" id="heading">
          <h2>Edit Task</h2>
        </div>

        <input
          className="input"
          type="text"
          name="title"
          placeholder={props.currenttask.title}
        />

        <input
          className="input"
          type="text"
          name="description"
          placeholder={
            props.currenttask.description === ""
              ? "Description"
              : props.currenttask.description
          }
        />

        <div className="input" id="drop">
          <label>
            Category:
            <select placeholder={props.currenttask.category}>
              <option value="IMPORTANT">IMPORTANT</option>
              <option value="COMPLETED">COMPLETED</option>
              {props.categorylist.map((obj, index) => {
                return (
                  <option key={index} value={obj.Category}>
                    {obj.Category}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <input
          className="input"
          type="date"
          name="date"
          placeholder="dd-mm-yyyy"
        />

        <input
          className="input"
          type="time"
          name="time"
          placeholder={props.currenttask.time}
        />

        <input className="input" id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Edititem;

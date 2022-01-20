import React, { useState } from "react";
import axios from "axios";

function Edititem(props) {
  async function handleEditSubmit(event) {
    const val = event.target;
    var edit = {
      title: val[0].value,
      description: val[1].value,
      category: val[2].value,
      id: props.editid,
      date: val[3].value,
      time: val[4].value,
      userid: props.userid,
    };
    console.log(edit.date);
    //data = JSON.parse(JSON.stringify(data));

    const current = await axios.get(
      "http://localhost:8080/task/" + props.editid,
      {
        mode: "cors",
      }
    );

    console.log(current.data);

    if (edit.title === "") {
      edit.title = current.data.title;
    } else {
      console.log("edited title");
    }

    if (edit.description === "") {
      edit.description = current.data.description;
    } else {
      console.log("edited description");
    }

    if (edit.category === "") {
      edit.category = current.data.category;
    } else {
      console.log("edited category");
    }

    if (edit.date === "") {
      edit.date = current.data.date;
    } else {
      console.log("edited date");
    }

    if (edit.time === "") {
      edit.time = current.data.time;
    } else {
      console.log("edited time");
    }

    edit.time = edit.time.substring(11, edit.time.length - 4);
    edit.date = new Date(edit.date).toLocaleDateString();

    axios.patch("http://localhost:8080/task/entry/" + props.editid, edit, {
      header: { "content-type/json": "application/json" },
    });

    // props.setTask(props.tasks.push(entry));
  }

  return (
    <div className="box">
      <form onSubmit={handleEditSubmit}>
        <div className="Box" id="heading">
          <h2>Edit Task</h2>
        </div>

        <input className="input" type="text" name="title" placeholder="Title" />

        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
        />

        <div className="input" id="drop">
          <label>
            Category:
            <select>
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

        <input className="input" type="date" name="date" placeholder="Date" />

        <input className="input" type="time" name="time" placeholder="time" />

        <input className="input" id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Edititem;

import React from "react";
import axios from "axios";

function Additem(props) {
  var url = "https://murmuring-earth-95812.herokuapp.com/";

  //submit new entry
  async function handleSubmit(event) {
    const val = event.target;
    var data = {
      title: val[0].value,
      description: val[1].value,
      category: val[2].value,
      id: 0,
      date: val[3].value,
      time: val[4].value,
      userid: 1,
    };

    await axios
      .post(url + "task/entry", data, {
        header: { "content-type/json": "application/json" },
      })
      .then(() => props.setTask(props.tasks.push(data)));
    //immediately add new task without calling new GET request to backend
  }

  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        <div className="Box" id="heading">
          <h2>Add Task</h2>
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

        <input className="input" type="date" name="date" />

        <input className="input" type="time" name="time" />

        <input className="input" id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Additem;

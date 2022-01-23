import Header from "./header";
import List from "./list";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Additem from "./additem";
import Edititem from "./edititem";
import LoadingSpin from "./LoadingSpin";

function App() {
  const nowtime = new Date().toLocaleTimeString();
  const nowdate = new Date().toLocaleTimeString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const [tasks, setTask] = useState([]);
  const [time, setTime] = useState(nowtime);
  const [date, setDate] = useState(nowdate);
  const [categorylist, setCategoryList] = useState([]);
  const [category, setCategory] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [showlist, setShowList] = useState(true);
  const [showadd, setShowAdd] = useState(false);
  const [deletemode, setDeleteMode] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [editid, setEditId] = useState(-1);
  const [currenttask, setCurrentTask] = useState([]);

  var url = "https://murmuring-earth-95812.herokuapp.com/";

  //Get saved posts from the database when the page first renders
  useEffect(() => {
    const getPosts = async () => {
      console.log("Hello");
      setIsLoading(true);
      const response = await axios.get(url + "task", {
        mode: "cors",
      });
      if (response.data) setTask(response.data);
      setIsLoading(false);
    };
    getPosts();
  }, []);
  //ditto but for categories
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(url + "categories", {
        mode: "cors",
      });
      if (res.data) setCategoryList(res.data);
    };
    getCats();
  }, []);

  return (
    <div>
      {isLoading && <LoadingSpin asOverlay />}
      <Header
        categorylist={categorylist}
        setCategoryList={setCategoryList}
        category={category}
        setCategory={setCategory}
        time={time}
        setTime={setTime}
        date={date}
        setDate={setDate}
      />
      <div className="listapp">
        {showlist && (
          <List
            data={tasks}
            showadd={showadd}
            setShowAdd={setShowAdd}
            deletemode={deletemode}
            setDeleteMode={setDeleteMode}
            tasks={tasks}
            setTask={setTask}
            editmode={editmode}
            setEditMode={setEditMode}
            editid={editid}
            setEditId={setEditId}
            category={category}
            currenttask={currenttask}
            setCurrentTask={setCurrentTask}
          />
        )}

        {showadd && !editmode && (
          <Additem
            setShowList={setShowList}
            tasks={tasks}
            setTask={setTask}
            categorylist={categorylist}
          />
        )}
        {editmode && !showadd && (
          <Edititem
            setShowList={setShowList}
            data={tasks}
            setTask={setTask}
            editid={editid}
            setEditId={setEditId}
            categorylist={categorylist}
            currenttask={currenttask}
          />
        )}
      </div>
    </div>
  );
}

export default App;

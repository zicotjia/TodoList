import Header from "./header";
import List from "./list";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Additem from "./additem";
import Edititem from "./edititem";

function App() {
  const LOCAL_STORAGE_KEY = "tasks";

  const [tasks, setTask] = useState([]);
  const [categorylist, setCategoryList] = useState([]);
  const [category, setCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [showlist, setShowList] = useState(true);
  const [showadd, setShowAdd] = useState(false);
  const [deletemode, setDeleteMode] = useState(false);
  const [editmode, setEditMode] = useState(false);
  const [editid, setEditId] = useState(-1);

  //Get saved posts from the database when the page first renders
  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8080/task", {
        mode: "cors",
      });
      if (response.data) setTask(response.data);
      setIsLoading(false);
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("http://localhost:8080/categories", {
        mode: "cors",
      });
      if (res.data) setCategoryList(res.data);
      console.log(tasks.id);
    };
    getCats();
  }, []);

  return (
    <div>
      <Header
        categorylist={categorylist}
        category={category}
        setCategory={setCategory}
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
          />
        )}
      </div>
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
          tasks={tasks}
          setTask={setTask}
          editid={editid}
          setEditId={setEditId}
          categorylist={categorylist}
        />
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";

import DragNDrop from "./components/DragNDrop";
import defaultData from "./assets/defaultData.json";
import GroupEditor from "./components/GroupEditor";

function App() {

  let initialData;
  if (localStorage.getItem('akarshJairajToDoStore')) {
    initialData = JSON.parse(localStorage.getItem('akarshJairajToDoStore'))
  } else {
    initialData = JSON.parse(JSON.stringify(defaultData))
  }

  const [data, setData] = useState(initialData);
  const [boardName, setBoardName] = useState("My Board");
  const [groupEditor, setGroupEditor] = useState(false);
  return (
    <div className="App">
      <header className="App-header" onClick={e => {setGroupEditor(true)}}>{boardName}</header>
      <main>
        <DragNDrop key={1} data={data} setData={setData} />
      </main>
      {groupEditor && (
        <GroupEditor
          setGroupEditor={setGroupEditor}
          type="update"
          setBoardName={setBoardName}
          title={boardName}
        />
      )}
    </div>
  );
}

export default App;

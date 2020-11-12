import React, { useState } from "react";
import { handleUpdateGroup } from "../utils/utils";
import "./GroupEditor.css";

export default function GroupEditor(props) {
  let { list, grpI, setList, setGroupEditor, title, setBoardName } = props;
  const [groupTitle, setGroupTitle] = useState(title || "");

  const handleSave = () => {
    if (list) {
      let type = title ? "update" : "add";
      handleUpdateGroup({ title: groupTitle, setList, list, type, grpI });
      setGroupEditor(false);
    } else {
      setBoardName(groupTitle);
      setGroupEditor(false);
    }

  };
  return (
    <div className="group-editor-layover">
      <div className="group-editor">
        <div className="group-editor-header">
          <span></span>
          <h3>{title ? "Update" : "Enter"} Name</h3>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={(e) => {
              setGroupEditor(false);
            }}
          ></i>
        </div>
        <input
          value={groupTitle}
          onChange={(e) => {
            setGroupTitle(e.target.value);
          }}
          placeholder="Enter group title"
        ></input>
        <button onClick={handleSave} className="group-editor-button">Save</button>
      </div>
    </div>
  );
}

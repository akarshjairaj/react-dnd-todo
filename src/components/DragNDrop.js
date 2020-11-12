import React, { useState, useRef, useEffect } from "react";
import "./DragNDrop.css";
import Group from "./Group";
import GroupEditor from "./GroupEditor";

function DragNDrop({ data, setData }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const [groupEditor, setGroupEditor] = useState(false);

  useEffect(() => {
    localStorage.setItem("akarshJairajToDoStore", JSON.stringify(list));
  }, [list]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current !== e.target) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.grpI].items.splice(
          targetItem.itemI,
          0,
          newList[dragItem.current.grpI].items.splice(
            dragItem.current.itemI,
            1
          )[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };
  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };
  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };

  if (list) {
    return (
      <div className="drag-n-drop">
        {list.map((grp, grpI) => (
          <Group
            key={grpI}
            grp={grp}
            grpI={grpI}
            handletDragStart={handletDragStart}
            handleDragEnter={handleDragEnter}
            getStyles={getStyles}
            dragging={dragging}
            setList={setList}
            list={list}
          />
        ))}
        <div
          className="dnd-group add"
          onClick={(e) => {
            setGroupEditor(true);
          }}
        >
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
          <p className="group-header-title">Add group...</p>
        </div>
        {groupEditor && (
          <GroupEditor
            setGroupEditor={setGroupEditor}
            list={list}
            type="add"
            setList={setList}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
}

export default DragNDrop;

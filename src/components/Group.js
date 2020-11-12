import React, { useState } from "react";
import Item from "./Item";
import "./Group.css";
import ItemEditor from "./ItemEditor";
import Delete from "./Delete";
import GroupEditor from "./GroupEditor";

export default function Group(props) {
  let {
    handletDragStart,
    handleDragEnter,
    getStyles,
    dragging,
    grp,
    grpI,
    setList,
    list,
  } = props;

  const [edit, setEdit] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [groupEditor, setGroupEditor] = useState(false);
  return (
    <div
      onDragEnter={
        dragging && !grp.items.length
          ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
          : null
      }
      className="dnd-group"
    >
      <div className="group-header">
        <p
          onClick={(e) => {
            setGroupEditor(true);
          }}
          className='group-header-title'
        >
          {grp.title}
        </p>
        <i
          className="fa fa-trash"
          title="Delete group"
          aria-hidden="true"
          onClick={(e) => {
            setDeleteConfirm(true);
          }}
        ></i>
      </div>
      {grp.items.map((itemObj, itemI) => (
        <Item
          key={itemI}
          title={itemObj.title}
          itemI={itemI}
          desc={itemObj.desc}
          comments={itemObj.comments}
          grpI={grpI}
          handletDragStart={handletDragStart}
          handleDragEnter={handleDragEnter}
          getStyles={getStyles}
          dragging={dragging}
          setList={setList}
          list={list}
        />
      ))}
      <div className="group-footer">
        <i
          className="fa fa-plus-circle"
          title="Add card"
          aria-hidden="true"
          onClick={(e) => {
            setEdit(true);
          }}
        ></i>
      </div>
      {edit ? (
        <ItemEditor
          comments={[]}
          title={""}
          desc={""}
          setEdit={setEdit}
          setList={setList}
          list={list}
          grpI={grpI}
          type="add"
        />
      ) : null}
      {deleteConfirm && (
        <Delete
          setDeleteConfirm={setDeleteConfirm}
          setEdit={setEdit}
          list={list}
          grpI={grpI}
          type="delete"
          setList={setList}
        />
      )}
      {groupEditor && (
        <GroupEditor
          setGroupEditor={setGroupEditor}
          list={list}
          type="update"
          setList={setList}
          title={grp.title}
          grpI={grpI}
        />
      )}
    </div>
  );
}

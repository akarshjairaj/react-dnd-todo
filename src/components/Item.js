import React, { useState } from "react";
import "./Item.css";
import ItemEditor from "./ItemEditor";

const Item = (props) => {
  let {
    handletDragStart,
    handleDragEnter,
    getStyles,
    dragging,
    itemI,
    grpI,
    title,
    desc,
    comments,
    setList,
    list,
  } = props;
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div
        draggable
        onDragStart={(e) => handletDragStart(e, { grpI, itemI })}
        onDragEnter={
          dragging
            ? (e) => {
                handleDragEnter(e, { grpI, itemI });
              }
            : null
        }
        className={dragging ? getStyles({ grpI, itemI }) : "dnd-item"}
      >
        <p>{title}</p>
        <i
          className="fa fa-pencil"
          title="Edit"
          aria-hidden="true"
          onClick={(e) => {
            setEdit(true);
          }}
        ></i>
      </div>
      {edit ? (
        <ItemEditor
          comments={comments}
          title={title}
          desc={desc}
          comments={comments}
          setEdit={setEdit}
          list={list}
          setList={setList}
          grpI={grpI}
          itemI={itemI}
          type="update"
        />
      ) : null}
    </>
  );
};

export default Item;

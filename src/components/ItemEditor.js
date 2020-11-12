import React, { useState } from "react";
import "./ItemEditor";
import "./ItemEditor.css";
import Delete from "./Delete";
import { handleUpdateItem } from "../utils/utils";
import { timeFormat } from "d3";

export default function ItemEditor(props) {
  let {
    title,
    desc,
    comments,
    setEdit,
    list,
    setList,
    grpI,
    itemI,
    type,
  } = props;
  let initialState = {
    title,
    desc,
    comments,
  };
  const [itemData, setItemData] = useState(initialState);
  const [newComment, setNewComment] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <div className="item-editor-overlay">
      <div className="item-editor-container">
        <div className="item-editor-form">
          <div className="item-editor-header">
            <i
              className="fa fa-trash delete-icon"
              aria-hidden="true"
              title="Delete"
              onClick={(e) => {
                setDeleteConfirm(true);
              }}
            ></i>
            <h2>Card Editor</h2>
            <i
              className="fa fa-times close-icon"
              aria-hidden="true"
              title="Close"
              onClick={(e) => {
                setEdit(false);
              }}
            ></i>
          </div>
          <div className="item-editor">
            <p className="label">Name*</p>
            <input
              value={itemData.title}
              type="text"
              onChange={(e) => {
                setItemData({ ...itemData, title: e.target.value });
              }}
            ></input>
          </div>
          <div className="item-editor">
            <p className="label">Description</p>
            <textarea
              value={itemData.desc}
              onChange={(e) => {
                setItemData({ ...itemData, desc: e.target.value });
              }}
            ></textarea>
          </div>
          <div className="item-editor">
            <p className="label">Comments</p>
            <div className="comment-editor">
              <textarea
                placeholder="Add comment..."
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
              ></textarea>
              <button
                onClick={(e) => {
                  if (newComment !== "") {
                    setItemData({
                      ...itemData,
                      comments: [
                        {
                          comment: newComment,
                          timestamp: timeFormat("%b %d, %H:%M")(new Date()),
                        },
                        ...itemData.comments,
                      ],
                    });
                    setNewComment("");
                  }
                }}
              >
                Comment
              </button>
            </div>
            {itemData.comments.length > 0 && (
              <div className="comment-holder">
                {itemData.comments.map((comObj, comI) => (
                  <div key={comI} className="comment-container">
                    <p className="comment">{comObj.comment}</p>
                    <p className="timestamp">{comObj.timestamp}</p>
                    <hr />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="item-editor center">
            <button
              onClick={(e) => {
                if (itemData.title !== "") {
                  handleUpdateItem({
                    list,
                    grpI,
                    itemData,
                    type,
                    setEdit,
                    setList,
                    itemI,
                  });
                }
              }}
            >
              SAVE
            </button>
          </div>
        </div>
        {deleteConfirm && (
          <Delete
            setDeleteConfirm={setDeleteConfirm}
            setEdit={setEdit}
            list={list}
            grpI={grpI}
            itemI={itemI}
            itemData={itemData}
            type="delete"
            setList={setList}
          />
        )}
      </div>
    </div>
  );
}

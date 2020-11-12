import React from "react";
import "./Delete.css";
import { handleUpdateItem } from "../utils/utils";
import { handleUpdateGroup } from "../utils/utils";

export default function Delete(props) {
  let {
    list,
    grpI,
    itemData,
    itemI,
    type,
    setEdit,
    setList,
    setDeleteConfirm,
  } = props;

  const handleYes = () => {
    setDeleteConfirm(false);
    setEdit(false);
    if (itemData) {
      handleUpdateItem({
        list,
        grpI,
        itemData,
        itemI,
        type,
        setEdit,
        setList,
      });
    } else {
      handleUpdateGroup({
        list,
        grpI,
        itemData,
        type,
        setEdit,
        setList,
      })
    }
  };
  return (
    <div className="delete-form-overlay">
      <div className="delete-form">
        <p>Are you sure you want to delete?</p>
        <div className="delete-form-button-container">
          <button
            className="yes"
            onClick={(e) => {
              handleYes();
            }}
          >
            Yes
          </button>
          <button
            className="no"
            onClick={(e) => {
              setDeleteConfirm(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export const handleUpdateItem = ({
  list,
  grpI,
  itemData,
  itemI,
  type,
  setList,
  setEdit,
}) => {
  let newList;
  switch (type) {
    case "update":
      newList = list.map((group, groupIndex) =>
        groupIndex === grpI
          ? {
              ...group,
              items: group.items.map((item, itemIndex) =>
                itemIndex === itemI ? { ...itemData } : item
              ),
            }
          : group
      );
      setList(newList);
      setEdit(false);
      break;
    case "add":
      newList = list.map((group, groupIndex) =>
        groupIndex === grpI
          ? {
              ...group,
              items: [...group.items, { ...itemData }],
            }
          : group
      );
      setList(newList);
      setEdit(false);
      break;
    case "delete":
      newList = list.map((group, groupIndex) =>
        groupIndex === grpI
          ? {
              ...group,
              items: group.items.filter(
                (item, itemIndex) => itemIndex !== itemI
              ),
            }
          : group
      );
      setList(newList);
      setEdit(false);
      break;
    default:
      setList(list);
      setEdit(false);
  }
};

export const handleUpdateGroup = ({
  list,
  grpI,
  itemData,
  type,
  setList,
  title,
  setGroupEditor,
}) => {
  let newList;
  switch (type) {
    case "add":
      newList = [
        ...list,
        {
          title,
          items: [],
        },
      ];
      setList(newList);
      break;
    case "update":
      newList = list.map((group, groupIndex) =>
        groupIndex === grpI
          ? {
              ...group,
              title,
            }
          : group
      );
      setList(newList);
      break;
    case "delete":
      newList = list.filter((group, groupIndex) => groupIndex !== grpI);
      setList(newList);
      break;
    default:
      setList(list);
  }
};

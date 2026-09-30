import { DataContext } from "@/DataContext";
import Button from "./Button";
import TextField from "./TextField";
import iconCross from "@assets/icon-cross.svg";
import { useContext, useState } from "react";

const AddNewBoardForm = ({
  boardId,
  toggleDialog,
  columns = [],
  title = "",
}) => {
  const { setData, setSelectedBoardIndex } = useContext(DataContext);
  const [columnsArray, setColumnsArray] = useState(
    () => columns || [{ id: Date.now() }],
  );

  const removeColumnHandler = (idToRemove) => {
    setColumnsArray((prev) => prev.filter((col) => col.id !== idToRemove));
  };

  const addNewColumnHandler = () => {
    setColumnsArray((prev) => [...prev, { id: Date.now(), title: "" }]);
  };

  const createNewColumnsArray = (formData, columnsArray, boardId) => {
    const tasksArray = boardId ? columnsArray.tasks : [];

    return columnsArray.map((column) => {
      return {
        id: column.id,
        title: formData.get(column.id),
        tasks: tasksArray,
      };
    });
  };

  const updateData = (newColumnsArray, boardName, boardId) => {
    setData((prev) => {
      let newData;
      if (boardId) {
        newData = prev.map((item) => {
          if (item.id === boardId) {
            return {
              ...item,
              title: boardName,
              columns: newColumnsArray,
            };
          }
          return item;
        });
      } else {
        setSelectedBoardIndex(prev.length);
        newData = [
          ...prev,
          {
            id: Date.now(),
            title: boardName,
            columns: newColumnsArray,
          },
        ];
      }
      return newData;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardName = formData.get("boardName");
    const newColumnsArray = createNewColumnsArray(
      formData,
      columnsArray,
      boardId,
    );
    updateData(newColumnsArray, boardName, boardId);
    toggleDialog(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h3 className="text-body-m text-medium-grey pt-6 pb-2">Name</h3>
        <TextField
          placeholder="e.g. Web Design"
          name="boardName"
          defaultValue={title}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-body-m text-medium-grey pt-6 pb-2">Columns</h3>
        {columnsArray.map((obj) => (
          <div key={obj.id} className="flex items-center gap-4">
            <TextField
              placeholder="e.g. Web Design"
              name={obj.id}
              defaultValue={obj.title}
              required
            />
            <button type="button" onClick={() => removeColumnHandler(obj.id)}>
              <img src={iconCross} alt="remove" />
            </button>
          </div>
        ))}

        <Button
          type="button"
          variant="secondary"
          size="s"
          className="w-full"
          onClick={addNewColumnHandler}
        >
          + Add New Column
        </Button>
      </div>
      <div className="mt-6">
        <Button type="submit" variant="primary" size="m" isFullWidth={true}>
          {boardId ? "Update" : "Creat New"} Board
        </Button>
      </div>
    </form>
  );
};

export default AddNewBoardForm;

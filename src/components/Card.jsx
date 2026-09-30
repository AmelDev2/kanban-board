import { DataContext } from "@/DataContext";
import { produce } from "immer";
import { useContext, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities"

const Card = ({ title, columnId, cardId, cardIndex, columnIndex }) => {
  const { setData, selectedBoardIndex } = useContext(DataContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: cardId, data: { columnId } });
  const onDeleteHandler = () => {
    if (window.confirm("Are You Sure You Want To Delete This Card?")) {
      setData((prev) => {
        const newData = [...prev];
        const newColumns = newData[selectedBoardIndex].columns.map((column) => {
          if (column.id === columnId) {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== cardId),
            };
          }
          return column;
        });
        newData[selectedBoardIndex] = {
          ...newData[selectedBoardIndex],
          columns: newColumns,
        };
        return newData;
      });
    }
  };
  const toggleEditMode = () => {
    setIsEditMode(true);
  };

  const onBlurHandler = (e) => {
    setIsEditMode(false);
    if (e.target.value.trim() === title) return;
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns[columnIndex].tasks[cardIndex].title =
          e.target.value.trim();
      }),
    );
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };
  const style = {
    transform:CSS.Transform.toString(transform),
    transition,
  }

  const onFocusHandler = (e) => e.target.select;
  return (
    <div className="group/card relative min-h-16 overflow-hidden rounded-lg bg-white px-4 py-3 shadow"
    style={style}  ref={setNodeRef} {...attributes}{...listeners}
    >


      {isEditMode ? (
        <textarea
          className="text-heading-m outline-light-grey h-full resize-none"
          // value={title}
          defaultValue={title}
          onFocus={onFocusHandler}
          autoFocus
          onBlur={onBlurHandler}
          onKeyDown={onKeyDownHandler}
        ></textarea>
      ) : (
        <button
          className="peer text-heading-m h-full text-start"
          onClick={toggleEditMode}
        >
          {title}
        </button>
      )}
      <button
        className="text-body-m text-red absolute top-0 right-0 bottom-0 cursor-pointer bg-white p-2 opacity-0 shadow duration-300 group-hover/card:opacity-100 peer-focus:opacity-100 focus:opacity-100"
        onClick={onDeleteHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default Card;

import { useContext } from "react";
import Card from "./Card";
import { DataContext } from "@/DataContext";
import { produce } from "immer";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

const Column = ({ id, title, tasks = [] ,columnIndex}) => {
  const { selectedBoardIndex, setData } = useContext(DataContext);

  const { setNodeRef } = useDroppable({
    id: id,
    data: {
      type: "Column",
      columnId: id,
    },
  });


  const tasksIds = tasks.map((task) => task.id);

  const addNewTaskHandler = () => {
    const newTask = {
      id: Date.now(),
      title: "New Task",
    };

    setData(
      produce((draft) => {
        const column = draft[selectedBoardIndex]?.columns.find(
          (col) => col.id === id,
        );
        if (column) {
          column.tasks.push(newTask);
        }
      }),
    );
  };



  // const addNewTaskHandler = () => {
  //   const newTask = {
  //     id: Date.now(),
  //     title: "New Task",
  //   };

  //   // ✅ استخدام immer بالطريقة الصحيحة لتعديل الـ draft مباشرة
  //   setData(
  //     produce((draft) => {
  //       const column = draft[selectedBoardIndex]?.columns.find(
  //         (col) => col.id === id,
  //       );
  //       if (column) {
  //         column.tasks.push(newTask);
  //       }
  //     }),
  //   );
  // };

  const onDeleteHandler = () => {
    if (window.confirm(`Are You Sure You Want Delete This ${title}?`)) {
      setData((prev) => {
        return produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = draft[
            selectedBoardIndex
          ].columns.filter((column) => column.id !== id);
        });
      });
    }
  };

  return (
    <div ref={setNodeRef}  className="bg-lines-light flex w-72 shrink-0 flex-col gap-6 self-start rounded-lg px-2 shadow">
      <h2 className="group/column bg-lines-light text-heading-s relative top-0 rounded px-2 py-4">
        {title} ({tasks.length})
        <button
          className="text-red text-body-m absolute top-0 right-0 bottom-0 cursor-pointer p-2 opacity-0 duration-300 group-hover/column:opacity-100 focus:opacity-100"
          onClick={onDeleteHandler}
        >
          Delete
        </button>
      </h2>
      <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
      <div className="mb-5 flex flex-col gap-5">
        {tasks.map((task,index) => (
          <Card
            key={task.id}
            title={task.title}
            columnId={id}
            cardId={task.id}
            cardIndex={index}
            columnIndex={columnIndex}
          />
        ))}
      </div>
      </SortableContext>
      <button
        className="border-light-grey bg-lines-light text-heading-m text-medium-grey -mx-2 mt-auto border-t px-2 py-4"
        onClick={addNewTaskHandler}
      >
        + Add New Task
      </button>
    </div>
  );
};

export default Column;

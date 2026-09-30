import { useContext, useMemo } from "react";
import Column from "./Column";
import { DataContext } from "@/DataContext";
import { produce } from "immer";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
/**
 
 *  @param {Object} props - خصائص المكون.
 *  @param {Array} [props.columns] - مصفوفة الأعمدة المراد عرضها.
 *  @param {Object} [props.columns.id] 
 *  @param {Array} [props.columns.tasks] 
 *  @param {String} [props.columns.title] 
 *  @returns {JSX.Element}
 */

const WorkSpace = () => {
  const { data, setData, selectedBoardIndex } = useContext(DataContext);
  const columns = useMemo(() => {
    return data[selectedBoardIndex]?.columns || [];
  }, [data, selectedBoardIndex]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const createNewColumn = (num) => ({
    id: Date.now(),
    title: `New Column ${num}`,
    tasks: [],
  });

  const addNewColumnHandler = () => {
    const num = data[selectedBoardIndex].columns?.length;
    const newColumn = createNewColumn(num);
    setData((prev) =>
      produce(prev, (draft) => {
        draft[selectedBoardIndex].columns.push(newColumn);
      }),
    );
  };

  const onDragEndHandler = (event) => {
    console.log({ event });
    const { active, over } = event;
    const activeId = active.id;
    const overId = over?.id;
    const overColumnId = over?.data?.current?.columnId;
    const activeColumnId = active?.data?.current?.columnId;

    if (activeId === overId) return;

    if (activeColumnId === overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === activeColumnId) {
          const activeIdIndex = column.tasks.findIndex(
            (task) => task.id === activeId,
          );
          const overIdIndex = column.tasks.findIndex(
            (task) => task.id === overId,
          );
          const tasks = arrayMove(column.tasks, activeIdIndex, overIdIndex);
          return { ...column, tasks };
        }
        return column;
      });

      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = newColumns;
        }),
      );
    }
  };

  const onDragOverHandler = (event) => {
    const { active, over } = event;
    const activeId = active.id;
    const overColumnId = over?.data?.current?.columnId;
    const activeColumnId = active?.data?.current?.columnId;

    if (overColumnId && activeColumnId !== overColumnId) {
      const newColumns = columns.map((column) => {
        if (column.id === overColumnId) {
          const activeTask = columns
            .find((column) => column.id === activeColumnId)
            .tasks.find((task) => task.id === activeId);
          const tasks = [...column.tasks, activeTask];
          return { ...column, tasks };
        }

        if (column.id === activeColumnId) {
          const tasks = column.tasks.filter((task) => task.id !== activeId);
          return { ...column, tasks };
        }
        return column;
      });
      setData((prev) =>
        produce(prev, (draft) => {
          draft[selectedBoardIndex].columns = newColumns;
        }),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEndHandler}
      onDragOver={onDragOverHandler}
    >
      <div className="bg-light-grey flex h-[calc(100vh-97px)] flex-1 gap-6 overflow-auto p-6">
        {columns?.length > 0 &&
          columns.map((item, index) => (
            <Column
              key={item.id}
              id={item.id}
              title={item.title}
              tasks={item.tasks}
              columnIndex={index}
            />
          ))}

        <button
          className="bg-lines-light text-heading-l text-medium-grey flex w-72 shrink-0 flex-col gap-6 self-start rounded-md p-3 px-2 shadow"
          onClick={addNewColumnHandler}
        >
          + New Column
        </button>
      </div>
    </DndContext>
  );
};

export default WorkSpace;

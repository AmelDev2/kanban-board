import { clsx } from "clsx";
import { useContext, useState } from "react";
import DialogPrimitive from "@components/DialogPrimitive";
import iconBoard from "@assets/icon-board.svg";
import { DataContext } from "@/DataContext";
import AddNewBoardForm from "./AddNewBoardForm";
/**
 * @param {Object} props - خصائص المكون.
 * @param {String|Number} [props.props.data.id] - معرف اللوحة الفريد.
 * @param {String} [props.props.data.title] - عنوان اللوحة.
 * @param {Array} [props.props.data.columns] - أعمدة اللوحة.
 * @param {Number} [props.selectedBoardIndex] - فهرس اللوحة النشطة حالياً.
 * @param {Function} [props.setSelectedBoardIndex] - دالة لتحديث فهرس اللوحة المختارة.
 * @returns {JSX.Element}
 */

const SideMenue = () => {
  const [open, setOpen] = useState(false);
  const { data, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);
  console.log("data:", data);

  return (
    <aside className="side-menu border-lines-light -mt-px w-75 border-r bg-white">
      <p className="text-heading-s px-8 py-4">ALL BOARDS ({data.length}) </p>
      <ul>
        {data.map((item, index) => (
          <li key={item?.id || index}>
            <button
              className={clsx(
                "text-heading-m text-medium-grey data-[isactive=false]:hover:bg-main-purple/10 data-[isactive=false]:hover:text-main-purple flex w-11/12 items-center gap-4 rounded-e-full px-8 py-4 transition",
                {
                  "bg-main-purple hover:bg-main-purple text-white":
                    selectedBoardIndex === index,
                },
              )}
              data-isactive={selectedBoardIndex === index}
              onClick={() => setSelectedBoardIndex(index)}
            >
              <img src={iconBoard} alt="board icon" />
              {item?.title}
            </button>
          </li>
        ))}

        <li className="px-8 py-4">
          <DialogPrimitive
            isOpen={open}
            setOpen={setOpen}
            title="Creat New Board"
            trigger={
              <button className="text-heading-m text-main-purple flex w-full items-center gap-4">
                <img src={iconBoard} />+ Create New Board
              </button>
            }
          >
            <AddNewBoardForm toggleDialog={setOpen} />
          </DialogPrimitive>
        </li>
      </ul>
    </aside>
  );
};
export default SideMenue;

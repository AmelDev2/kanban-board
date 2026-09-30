import DropdownPrimitive from "@components/DropdownPrimitive";
import iconVerticalEllipsis from "@assets/icon-vertical-ellipsis.svg";
import DialogPrimitive from "@components/DialogPrimitive";
import { useContext, useState } from "react";
import { DataContext } from "@/DataContext";
import AddNewBoardForm from "@components/AddNewBoardForm";
/**
 * @param {Object} props - خصائص المكون (Header لا يستقبل خصائص حالياً).
 * @returns {JSX.Element}
 */

const Header = () => {
  const [open, setOpen] = useState(false);
  const { data, setData, selectedBoardIndex, setSelectedBoardIndex } =
    useContext(DataContext);

  const currentBoard = data[selectedBoardIndex];
  const onEditBoard = () => {
    setOpen(true);
  };
  const onDeleteBoard = () => {
    if (window.confirm("Are You sure you want to delete this board?")) {
      setData((prev) => {
        const newData = [...prev];
        newData.splice(selectedBoardIndex, 1);
        return newData;
      });
      setSelectedBoardIndex(0);
    }
  };

  return (
    <header className="flex h-24.25 shrink-0 items-center">
      <div className="border-lines-light flex w-75 items-center gap-4 self-stretch border-r border-b pl-8 text-[32px] font-bold">
        Kanban
      </div>
      <div className="border-lines-light flex flex-1 items-center justify-between self-stretch border-b px-6">
        <h2 className="text-heading-xl">
          {currentBoard?.title || "Platform Launch"}
        </h2>
        <DropdownPrimitive
          items={{
            Edit: {
              label: "Edit Board", // عدلناها إلى حرف صغير لتوحيد المعيار
              onClick: onEditBoard,
              className: "text-gray-700 hover:bg-gray-100",
            },
            Delete: {
              label: "Delete Board", // عدلناها وصارت واضحة
              onClick: onDeleteBoard,
              className: "text-red-500 hover:bg-red-50", // تأكدي من اسم كلاس اللون الأحمر حسب إعدادات تايليند لديك
            },
          }}
          triggerComponent={() => (
            <button className="text-main-purple flex cursor-pointer items-center gap-2 text-[14px] font-bold">
              <img src={iconVerticalEllipsis} alt="icon vertical ellipsis" />
            </button>
          )}
        />

        <DialogPrimitive isOpen={open} setOpen={setOpen} title="Edit Board">
          <AddNewBoardForm
            toggleDialog={setOpen}
            boardId={currentBoard?.id}
            columns={currentBoard?.columns}
            title={currentBoard?.title}
          />
        </DialogPrimitive>
      </div>
    </header>
  );
};

export default Header;

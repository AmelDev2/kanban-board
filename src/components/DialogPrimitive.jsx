import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const DialogPrimitive = ({ trigger, title, children, isOpen, setOpen }) => (
  <Dialog.Root open={isOpen} onOpenChange={setOpen}>
    {/* الزر أو العنصر اللي يفتح الديالوج */}
    <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

    <Dialog.Portal>
      {/* خلفية معتمة تغطي الشاشة بالكامل وتحجب ما خلفها */}
      <Dialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 z-50 bg-black/50" />

      {/* محتوى البوب أب: مثبت في منتصف الشاشة بدقة */}
      <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl outline-none">
        {/* رأس النافذة ويحتوي العنوان */}
        <div className="mb-4 flex items-center justify-between">
          <Dialog.Title className="m-0 text-lg font-bold text-gray-900">
            {title}
          </Dialog.Title>

          {/* زر الإغلاق العلوي (الصليب) */}
          <Dialog.Close asChild>
            <button
              className="inline-flex size-7 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </div>

        {/* مكان إدخال الحقول أو المحتوى المتغير */}
        <div className="mt-2">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogPrimitive;

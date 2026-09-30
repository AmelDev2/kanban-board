import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const DropdownPrimitive = ({ items, triggerComponent }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {triggerComponent ? triggerComponent() : <button>Open</button>}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-45 rounded-md border border-gray-100 bg-white p-1 shadow-lg outline-none z-50"
          sideOffset={5}
        >
          {Object.entries(items).map(([key, item]) => (
            <DropdownMenu.Item
              key={key}
              onClick={item.onClick || item.onCLick}
              // هنا دمجنا الكلاسات الافتراضية مع الكلاس المخصص اللي ترسله من برة
              className={`flex h-8 cursor-pointer items-center rounded px-3 text-sm outline-none select-none transition-colors ${
                item.className || "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              {item.label || item.Label || item.lable}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownPrimitive;
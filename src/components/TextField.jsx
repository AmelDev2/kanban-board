import clsx from "clsx";

/**
 * @param {Object} props - خصائص المكون.
 * @param {String} [props.placeholder] - النص التوضيحي داخل حقل الإدخال.
 * @param {Boolean} [props.isInvalid] - يحدد ما إذا كانت هناك أخطاء في المدخلات لعرض رسالة التنبيه.
 * @param {String} [props.name] - اسم حقل الإدخال لفلترة النماذج.
 * @param {Boolean} [props.required] - يحدد ما إذا كان الحقل إجبارياً.
 * @param {String} [props.defaultValue] - القيمة الافتراضية للحقل.
 * @returns {JSX.Element}
 */

const TextField = ({
  placeholder,
  isInvalid,
  name,
  required,
  defaultValue,
}) => {
  return (
    <div className="relative flex min-w-80 flex-1 items-center">
      {isInvalid && (
        <span className="text-body-l text-red absolute right-4">
          can't be empty
        </span>
      )}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "border-medium-grey/25 text-body-m w-full rounded-sm border py-2 pl-4",
          {
            "border-red pr-32": isInvalid,
            "pr-4": !isInvalid,
          },
        )}
      />
    </div>
  );
};

export default TextField;

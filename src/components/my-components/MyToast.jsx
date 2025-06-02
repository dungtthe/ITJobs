import { MdErrorOutline } from "react-icons/md";
import { toast } from "sonner";

export function showErrorToastHasTitle(title, desc, position) {
  const renderDesc = () => {
    const uniqueMessages = Array.isArray(desc) ? [...new Set(desc)] : [desc];

    if (uniqueMessages.length === 1) {
      return (
        <p className="text-destructive/80 text-sm mt-1">{uniqueMessages[0]}</p>
      );
    }

    return (
      <ul className="list-disc list-inside text-destructive/80 text-sm mt-1 space-y-1">
        {uniqueMessages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    );
  };
  toast(
    <div className="text-destructive p-3 rounded-md bg-destructive/5 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <MdErrorOutline className="size-5" />
        <p>{title}</p>
      </div>
      {renderDesc()}
    </div>,
    {
      style: {
        background: "bg-destructive/5",
        border: "none",
        padding: 0,
        width: "fit-content",
        maxWidth: "800px",
      },
      className: "custom-error-toast",
      position: position,
    }
  );
}

export function showSuccessToastHasTitle(title, desc, position) {
  toast(
    <div className="text-success p-3 rounded-md bg-success/5 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <MdErrorOutline className="size-5" />
        <p>{title}</p>
      </div>
      <p className="text-success/80 text-sm mt-1">{desc}</p>
    </div>,
    {
      // Override default styling
      style: {
        background: "bg-success/5",
        border: "none",
        padding: 0,
        width: "fit-content",
        maxWidth: "800px",
      },
      className: "custom-success-toast",
      position: position,
    }
  );
}

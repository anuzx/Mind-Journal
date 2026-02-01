import { Button } from "./Button";

type PopupProps = {
  open: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function Popup({ open, text, onConfirm, onCancel }: PopupProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center ">
        <div className="bg-white rounded-md p-8 w-80 shadow-lg">
          <p className="text-gray-800 mb-6 text-center">{text}</p>

          <div className="flex justify-center gap-4">
            <Button variant="primary" text="Yes" onClick={onConfirm} />

            <Button variant="secondary" text="No" onClick={onCancel} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;

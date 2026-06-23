import { Button } from "./Button";

type PopupProps = {
  open: boolean;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

function Popup({
  open,
  text,
  onConfirm,
  onCancel,
  confirmLabel = "Yes",
  cancelLabel = "No",
  danger = false,
}: PopupProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-[#11151D] border border-white/10 rounded-2xl p-8 w-80 shadow-[0_0_60px_-15px_rgba(139,124,246,0.3)]">
          <p
            className="text-[#ECE7DA] text-sm leading-relaxed mb-6 text-center"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {text}
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant={danger ? "danger" : "primary"}
              text={confirmLabel}
              onClick={onConfirm}
            />
            <Button variant="secondary" text={cancelLabel} onClick={onCancel} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;

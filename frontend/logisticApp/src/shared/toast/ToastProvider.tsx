import { X } from "lucide-react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        duration: 5000,
        style: {
          backgroundColor: "var(--grey-hover)",
          color: "var(--white)",
          fontWeight: "500",
          gap: "20px",
          borderRadius: "8px",
          padding: "12px",
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <button
                  className="btn--close"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <X size={24} />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

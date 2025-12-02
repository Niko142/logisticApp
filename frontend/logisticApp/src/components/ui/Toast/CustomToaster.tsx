import toast, { ToastBar, Toaster, type Toast } from "react-hot-toast";

import { TOAST_CONFIG } from "@/config/toast";

import { CloseToastButton } from "./CloseToastButton";

export const CustomToaster = (): React.ReactElement => {
  return (
    <Toaster toastOptions={TOAST_CONFIG}>
      {(t: Toast) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== "loading" && (
                <CloseToastButton onClick={() => toast.dismiss(t.id)} />
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

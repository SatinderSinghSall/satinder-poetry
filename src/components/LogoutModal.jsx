import { LogOut, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function LogoutModal({ open, onOpenChange, logout }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="
          w-[92vw] max-w-[440px]
          p-6 sm:p-8
          rounded-[28px] sm:rounded-[36px]
          bg-[#faf7f2]
          border border-[#e8ded0]
          shadow-[0_25px_60px_-15px_rgba(28,24,20,0.25)]
          backdrop-blur-xl
          space-y-6
          outline-none
        "
      >
        <AlertDialogHeader className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
          {/* Warning Icon Badge */}
          <div
            className="
              w-12 h-12 sm:w-14 sm:h-14 
              rounded-full 
              bg-[#fcf0ed] 
              border border-[#f4dcd6] 
              flex items-center justify-center 
              text-[#9e3a3a] 
              shadow-inner
            "
          >
            <LogOut className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
          </div>

          <div className="space-y-2">
            <AlertDialogTitle
              className="
                text-2xl sm:text-3xl 
                text-[#201b18] 
                tracking-tight
                leading-none
              "
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
              }}
            >
              Sign out of your space?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm sm:text-base text-[#786e65] leading-relaxed">
              You will be signed out of your poetic session. Any unsaved drafts
              or active edits will be preserved locally.
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        {/* Action Buttons */}
        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-3 pt-2">
          <AlertDialogCancel
            className="
              w-full sm:w-auto
              px-6 py-3 sm:py-2.5
              rounded-full
              border border-[#dcd3c5]
              bg-[#efe7db]/50 hover:bg-[#eae0d2]
              text-[#4a423a] font-medium text-sm
              transition-all duration-300
              cursor-pointer
              m-0
            "
          >
            Stay Signed In
          </AlertDialogCancel>

          {/* Forced Red Button Styles */}
          <AlertDialogAction
            onClick={logout}
            className="
              w-full sm:w-auto
              px-7 py-3 sm:py-2.5
              rounded-full
              !bg-[#9e3a3a] hover:!bg-[#822d2d] focus:!bg-[#822d2d]
              !text-[#ffffff] font-medium text-sm
              shadow-[0_4px_14px_rgba(158,58,58,0.35)]
              hover:shadow-[0_6px_20px_rgba(158,58,58,0.45)]
              hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-300
              cursor-pointer
              border-none
            "
          >
            Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

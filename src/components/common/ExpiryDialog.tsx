import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { RootState } from "@/redux/store"
import { logout } from "@/redux/slices/authSlice"
import { LogOut, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/routes/routes"
import { useNavigate } from "react-router-dom"

const ExpiryDialog = () => {
  const isTokenExpired = useSelector((state: RootState) => state.auth.isTokenExpired)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Dialog open={isTokenExpired}>
      <DialogContent
        className={cn("sm:max-w-[425px] rounded-lg border border-border px-6 py-4", "[&>button]:hidden")}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold m-0">Session Expired</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="flex items-start gap-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 p-3 text-amber-900 dark:text-amber-200">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
            <p className="text-sm">
              For your security, your session has expired due to inactivity. Please log in again to continue.
            </p>
          </div>

          <Button
            onClick={() => {
              dispatch(logout());
              navigate(ROUTES.AUTH.LOGIN)
            }}
            className="text-white py-5 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Log In Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpiryDialog;
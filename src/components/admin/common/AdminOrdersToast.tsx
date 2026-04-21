"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { BellRingIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { AdminButton } from "../ui";
import { useOrderStream } from "@/hooks";

function AdminNewOrderToast({ toastId }: { toastId: string | number }) {
  // === HOOK ===
  const router = useRouter();

  return (
    <div className="relative flex min-w-80 items-start gap-3 rounded-xl border bg-popover p-4 text-popover-foreground shadow-xl">
      <button
        type="button"
        aria-label="Dismiss notification"
        className="absolute cursor-pointer top-3 right-3 flex size-7 items-center justify-center rounded-full border border-border/60 bg-background/90 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        onClick={() => toast.dismiss(toastId)}
      >
        <XIcon className="size-4" />
      </button>

      <div className="mt-0.5 rounded-full bg-blue-100 p-2 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
        <BellRingIcon className="size-4" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 pr-8">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-5 text-popover-foreground">
            New order update available
          </p>
          <p className="text-sm leading-5 text-muted-foreground">
            A recent order change was received. Refresh to view the latest data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AdminButton
            size="sm"
            onClick={() => {
              toast.dismiss(toastId);
              router.refresh();
            }}
          >
            Refresh
          </AdminButton>
        </div>
      </div>
    </div>
  );
}

export function AdminOrdersToast() {
  // === CALLBACKS ===
  const showNewOrderToast = useCallback(
    () => toast.custom((toastId) => <AdminNewOrderToast toastId={toastId} />),
    [],
  );

  useOrderStream({ onOrderUpdate: showNewOrderToast });

  return null;
}

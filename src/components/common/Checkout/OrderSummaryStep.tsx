"use client";

import Link from "next/link";

export function OrderSummaryStep() {
  return (
    <div className="space-y-2 flex flex-col ">
      {/* Order Items */}
      <span className="text-neutral-10 text-sm">
        By clicking the "Submit payment" button, you confirm that you have read,
        understand and accept our{" "}
        <Link href="#" className="font-bold underline">
          Terms of Use
        </Link>
        ,{" "}
        <Link href="#" className="font-bold underline">
          Terms of Sale
        </Link>
        ,{" "}
        <Link href="#" className="font-bold underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="#" className="font-bold underline">
          Returns Policy
        </Link>
        .
      </span>
    </div>
  );
}

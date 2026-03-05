"use client";

export function UpgradeButton() {
  return (
    <button
      className="w-full flex items-center justify-center rounded-xl py-3 text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
      style={{ background: "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.82))" }}
      onClick={() => alert("Payment integration coming soon!")}
    >
      Upgrade to Pro
    </button>
  );
}

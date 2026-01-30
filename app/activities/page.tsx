"use client";

import { useRouter } from "next/navigation";
import { ACTIVITIES } from "@/utils/constants";
import Button from "@/components/Button";
import NavigationButtons from "@/components/NavigationButtons";
import HeartCheckbox from "@/components/HeartCheckbox";
import { useFormData } from "@/contexts/FormContext";
import { useEffect, useState } from "react";

export default function Page3() {
  const router = useRouter();
  const { data, update } = useFormData();

  const [customOption] = useState("");

  useEffect(() => {
    if (data.meetupAnswer === false) {
      router.replace("/started");
    }

    if (!data.dates || data.dates.length === 0) {
      router.replace("/dates");
    }
  }, [data.meetupAnswer, data.dates, router]);

  // ===== LOGIC: toggle option (MULTI SELECT) =====
  const toggleOption = (option: string) => {
    const prev = data.activities ?? [];

    const updated = prev.includes(option)
      ? prev.filter((o) => o !== option)
      : [...prev, option];

    update({ activities: updated });
  };

  const canConfirm =
    (data.activities?.length ?? 0) > 0 ||
    Boolean(data.suggestActivities?.trim());

  const handleConfirm = () => {
    if (customOption.trim()) {
      update({
        activities: [...(data.activities ?? []), customOption.trim()],
      });
    }
    router.push("/summary");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-5 bg-[#fafafa]">
      <div className="w-full max-w-sm bg-[#fafafa] rounded-3xl p-6 text-center shadow-[10px_10px_20px_#d1d1d1,-10px_-10px_20px_#ffffff]">
        <h2 className="text-lg font-medium mb-1 m-0">{ACTIVITIES.question}</h2>
        <p className="text-sm italic text-gray-500 mt-1 mb-5 m-0">
          *Bisa pilih lebih dari satu aktivitas yaa
        </p>

        <div className="flex flex-col gap-4 mb-6">
          {ACTIVITIES.options.map((option) => (
            <div
              key={option}
              className="bg-[#fafafa] rounded-xl px-4 py-3 shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff]"
            >
              <HeartCheckbox
                label={option}
                checked={data.activities?.includes(option) ?? false}
                onChange={() => toggleOption(option)}
              />
            </div>
          ))}
        </div>

        <textarea
          placeholder={ACTIVITIES.anotherOptionPlaceholder}
          value={data.suggestActivities ?? ""}
          onChange={(e) => update({ suggestActivities: e.target.value })}
          rows={2}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-[#e8e8e8] text-[#090909] border border-[#e8e8e8] resize-none shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff] focus:outline-none"
        />

        <Button onClick={handleConfirm} disabled={!canConfirm}>
          {ACTIVITIES.confirmButtonText}
        </Button>

        <NavigationButtons />
      </div>
    </main>
  );
}

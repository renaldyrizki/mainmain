"use client";

import { useState, useMemo } from "react";
import Button from "@/components/Button";
import { formatDateKey, formatReadable } from "@/utils/calendar";

type Props = {
  open: boolean;
  selectedDates: string[]; // ["YYYY-MM-DD"]
  onToggleDate: (date: Date) => void;
  onClose: () => void;
};

export default function CalendarModal({
  open,
  selectedDates,
  onToggleDate,
  onClose,
}: Props) {
  if (!open) return null;

  // =======================
  // tanggal hari ini (WIB)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // =======================
  // state bulan yang tampil
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const canGoPrev =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  // =======================
  // array tanggal grid (ascending)
  const days: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => {
      const d = new Date(year, month, i + 1);
      d.setHours(0, 0, 0, 0);
      return d;
    }),
  ];

  // =======================
  // selectedDates sorted ascending
  const sortedSelectedDates = useMemo(
    () =>
      [...selectedDates].sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime(),
      ),
    [selectedDates],
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-[#fafafa] rounded-2xl p-5 w-80 shadow-[10px_10px_20px_#cfcfcf,-10px_-10px_20px_#ffffff]">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-3">
          <button
            disabled={!canGoPrev}
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="disabled:opacity-30"
          >
            ←
          </button>

          <span className="font-medium">
            {currentMonth.toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>
            →
          </button>
        </div>

        {/* DAYS HEADER */}
        <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
            <div key={d} className="text-center">
              {d}
            </div>
          ))}
        </div>

        {/* DATE GRID */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((date, i) => {
            if (!date) return <div key={i} />;

            const key = formatDateKey(date);
            const selected = selectedDates.includes(key);
            const isPast = date < today;

            return (
              <div
                key={key}
                onClick={() => !isPast && onToggleDate(date)}
                className={`
                  h-8 flex items-center justify-center rounded-lg text-sm
                  ${isPast ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
                  ${
                    selected
                      ? "bg-[#e0e0e0] shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
                      : "bg-[#fafafa] shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]"
                  }
                `}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        {/* SELECTED DATES SUMMARY */}
        {sortedSelectedDates.length > 0 && (
          <div className="mb-4 text-sm text-gray-700">
            <p className="font-medium mb-1">Tanggal terpilih:</p>
            <ul className="list-disc list-inside space-y-1">
              {sortedSelectedDates.map((date) => (
                <li key={date}>{formatReadable(date)}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center">
          <Button onClick={onClose}>Selesai</Button>
        </div>
      </div>
    </div>
  );
}

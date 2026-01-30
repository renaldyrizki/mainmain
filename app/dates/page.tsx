"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavigationButtons from "@/components/NavigationButtons";
import Button from "@/components/Button";
import CalendarModal from "@/components/CalendarModal";
import { DATE } from "@/utils/constants";
import { formatDateKey, formatReadable } from "@/utils/calendar";
import { useFormData } from "@/contexts/FormContext";
import Image from "next/image";

export default function Page2() {
  const router = useRouter();
  const { data, update } = useFormData();
  const [showCalendar, setShowCalendar] = useState(false);

  const dates = data.dates ?? [];

  /** 🔒 GUARD */
  useEffect(() => {
    if (data.meetupAnswer === false) {
      router.replace("/started");
    }
  }, [data.meetupAnswer, router]);

  const toggleDate = (date: Date) => {
    const key = formatDateKey(date);

    const updatedDates = dates.includes(key)
      ? dates.filter((d) => d !== key)
      : [...dates, key];

    update({ dates: updatedDates });
  };

  const removeDate = (key: string) => {
    update({
      dates: dates.filter((d) => d !== key),
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="bg-[#fafafa] rounded-3xl p-6 w-full max-w-sm text-center shadow-[10px_10px_20px_#d1d1d1,-10px_-10px_20px_#ffffff]">
        {/* IMAGE */}
        {/* <div className="h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center">
          <span className="text-sm text-gray-500">Image</span>
        </div> */}

        <div className="relative h-40 mb-4 rounded-xl overflow-hidden shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]">
          <Image
            src="/images/dates.webp"
            alt="Pilih tanggal"
            fill
            priority
            className="object-cover"
          />
        </div>

        <p className="text-lg mb-4">
          {DATE.question}
          <span className="block text-sm italic text-gray-500">
            *Bisa pilih lebih dari satu tanggal yaa
          </span>
        </p>

        {/* CALENDAR TRIGGER */}
        <button
          onClick={() => setShowCalendar(true)}
          className="w-full mb-4 px-4 py-3 rounded-lg text-left bg-[#e8e8e8]
          shadow-[inset_3px_3px_6px_#c5c5c5,inset_-3px_-3px_6px_#ffffff]"
        >
          📅 Pilih tanggal
        </button>

        {/* SELECTED LIST */}
        {dates.length > 0 && (
          <div className="mb-6 text-left text-sm">
            <p className="text-gray-500 mb-2">Tanggal dipilih:</p>

            <ul className="space-y-2">
              {dates.map((date) => (
                <li
                  key={date}
                  className="flex items-center justify-between px-3 py-2 rounded-lg
                  bg-[#f0f0f0]
                  shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]"
                >
                  <span>{formatReadable(date)}</span>
                  <button
                    onClick={() => removeDate(date)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={() => router.push("/activities")}
          disabled={!dates.length}
        >
          {DATE.buttonText}
        </Button>

        <NavigationButtons />
      </div>

      <CalendarModal
        open={showCalendar}
        selectedDates={dates}
        onToggleDate={toggleDate}
        onClose={() => setShowCalendar(false)}
      />
    </main>
  );
}

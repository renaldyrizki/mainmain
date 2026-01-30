"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import NavigationButtons from "@/components/NavigationButtons";
import { useFormData } from "@/contexts/FormContext";
import { SUMMARY, WHATSAPP_NUMBER } from "@/utils/constants";
import { useEffect } from "react";

export default function SummaryPage() {
  const router = useRouter();
  const { data } = useFormData();

  useEffect(() => {
    if (data.meetupAnswer === false) {
      router.replace("/started");
    }

    if (!data.dates || data.dates.length === 0) {
      router.replace("/dates");
    }

    if (
      (!data.activities || data.activities.length === 0) &&
      data.suggestActivities == null
    ) {
      router.replace("/activities");
    }
  }, [
    data.meetupAnswer,
    data.dates,
    data.activities,
    data.suggestActivities,
    router,
  ]);

  const formatTanggalID = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSendWhatsApp = () => {
    if (!data.meetupAnswer) {
      router.push("/started");
      return;
    }

    const sapaan = "Haiii, Ayoo main!";

    const datesHeader = "Aku bisanya tanggal:";
    const dates = data.dates?.length
      ? data.dates.map((d) => `- ${formatTanggalID(d)}`).join("\n")
      : "-";

    const activitiesHeader = "Kayaknya seru kalo:";
    let activities = data.activities?.length ? data.activities.join(", ") : "-";

    if (data.suggestActivities?.trim()) {
      activities += `, ${data.suggestActivities.trim()}`;
    }

    const message = [
      sapaan,
      "",
      datesHeader,
      dates,
      "",
      activitiesHeader,
      activities,
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-5 bg-[#fafafa]">
      <div
        className="
          w-full max-w-sm
          bg-[#fafafa]
          rounded-3xl
          p-6
          text-center
          shadow-[10px_10px_20px_#d1d1d1,-10px_-10px_20px_#ffffff]
        "
      >
        <h2 className="text-lg font-medium mb-6">{SUMMARY.title}</h2>

        {/* MEETUP ANSWER */}
        <div
          className="
            mb-4 p-4 rounded-xl
            bg-[#fafafa]
            text-left
            shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff]
          "
        >
          <p className="text-sm text-gray-500 mb-1">
            {SUMMARY.meetupAnswerTitle}
          </p>
          <p className="font-medium">{data.meetupAnswer ? "Yes" : "No 💔"}</p>
        </div>

        {/* DATES */}
        <div
          className="
            mb-4 p-4 rounded-xl
            bg-[#fafafa]
            text-left
            shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff]
          "
        >
          <p className="text-sm text-gray-500 mb-2">
            {SUMMARY.selectedDatesTitle}
          </p>
          {data.dates && data.dates.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {data.dates.map((date) => (
                <li key={date}>{formatTanggalID(date)}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No date selected</p>
          )}
        </div>

        {/* ACTIVITIES */}
        <div
          className="
            mb-4 p-4 rounded-xl
            bg-[#fafafa]
            text-left
            shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff]
          "
        >
          <p className="text-sm text-gray-500 mb-2">
            {SUMMARY.activitiesTitle}
          </p>

          {data.activities?.length || data.suggestActivities ? (
            <ul className="list-disc list-inside space-y-1">
              {[
                ...(data.activities || []),
                ...(data.suggestActivities ? [data.suggestActivities] : []),
              ].map((activity, i) => (
                <li key={i}>{activity}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No activity selected</p>
          )}
        </div>

        {/* ACTION */}
        <Button onClick={handleSendWhatsApp}>{SUMMARY.buttonText}</Button>

        <NavigationButtons />
      </div>
    </main>
  );
}

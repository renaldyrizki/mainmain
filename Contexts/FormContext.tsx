"use client";

import { createContext, useContext, useState } from "react";

type FormData = {
  meetupAnswer?: boolean;
  dates?: string[];
  activities?: string[];
  suggestActivities?: string;
};

const defaultData: FormData = {
  meetupAnswer: false,
  dates: [],
  activities: [],
  suggestActivities: "",
};

type FormContextType = {
  data: FormData;
  update: (values: Partial<FormData>) => void;
};

const FormContext = createContext<FormContextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>(defaultData);

  const update = (values: Partial<FormData>) => {
    setData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  return (
    <FormContext.Provider value={{ data, update }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("useFormData must be used inside FormProvider");
  }
  return ctx;
}

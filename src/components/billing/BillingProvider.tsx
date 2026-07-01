"use client";

import * as React from "react";

import {
  mockCurrentEmployerSubscription,
  mockCurrentStudentSubscription,
} from "@/lib/billing/mock-billing-data";
import type { Subscription, UserType } from "@/lib/billing/types";

type BillingState = {
  studentSubscription: Subscription;
  employerSubscription: Subscription;
  cancelSubscription: (type: Extract<UserType, "student" | "employer">) => void;
  resubscribe: (type: Extract<UserType, "student" | "employer">) => void;
};

const BillingContext = React.createContext<BillingState | null>(null);

export function BillingProvider({ children }: { children: React.ReactNode }) {
  const [studentSubscription, setStudentSubscription] = React.useState(mockCurrentStudentSubscription);
  const [employerSubscription, setEmployerSubscription] = React.useState(mockCurrentEmployerSubscription);

  const cancelSubscription = React.useCallback((type: Extract<UserType, "student" | "employer">) => {
    const updater = (subscription: Subscription): Subscription => ({
      ...subscription,
      status: "canceled",
      cancelAtPeriodEnd: true,
    });

    if (type === "student") {
      setStudentSubscription(updater);
    } else {
      setEmployerSubscription(updater);
    }
  }, []);

  const resubscribe = React.useCallback((type: Extract<UserType, "student" | "employer">) => {
    const updater = (subscription: Subscription): Subscription => ({
      ...subscription,
      status: "active",
      cancelAtPeriodEnd: false,
    });

    if (type === "student") {
      setStudentSubscription(updater);
    } else {
      setEmployerSubscription(updater);
    }
  }, []);

  const value = React.useMemo(
    () => ({ studentSubscription, employerSubscription, cancelSubscription, resubscribe }),
    [cancelSubscription, employerSubscription, resubscribe, studentSubscription],
  );

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}

export function useBilling() {
  const context = React.useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within BillingProvider");
  }
  return context;
}

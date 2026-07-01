"use client";

import { useMemo, useState } from "react";

function stableCtr(seed: string) {
  const score = seed.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
  return 3 + (score % 42) / 10;
}

export function useStudentDashboardStore() {
  const [variantA, setVariantA] = useState("Software engineer focused on cross-cultural student products");
  const [variantB, setVariantB] = useState("TypeScript builder for multilingual campus service tools");
  const ctrA = useMemo(() => stableCtr(variantA), [variantA]);
  const ctrB = useMemo(() => stableCtr(variantB), [variantB]);

  return {
    variantA,
    variantB,
    ctrA,
    ctrB,
    setVariantA,
    setVariantB,
  };
}

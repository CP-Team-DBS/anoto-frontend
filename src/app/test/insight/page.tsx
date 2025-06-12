import TestInsightPage from "@/components/test/insight-test";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestInsightPage />
    </Suspense>
  );
}
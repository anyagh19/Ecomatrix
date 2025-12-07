// app/manufacturing/page.tsx  (NO "use client")

import ManufacturingTable from "@/modules/manufacturing/components/manufacturingTable";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/manufactured-product/get-manufacturing-products`,
    {
      method: "POST",
      body: JSON.stringify({ cursor: null }),
      headers: { "Content-Type": "application/json" },
      cache: "no-store", // IMPORTANT for dynamic SSR
    }
  );

  const data = await res.json();

  return (
    <div>
      <ManufacturingTable
        initialProducts={data.data}
        initialCursor={data.nextCursor}
        initialHasMore={data.data.length >= 2}
      />
    </div>
  );
}

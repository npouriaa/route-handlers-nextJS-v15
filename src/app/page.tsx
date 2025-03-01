import DataTable from "@/components/DataTable";

export default async function Home() {
  return (
    <div className="p-9 flex items-center flex-col gap-7 w-full">
      <h1 className="text-3xl font-bold">Route handlers example Next Js v15</h1>
      <DataTable />
    </div>
  );
}

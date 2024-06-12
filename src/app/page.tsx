import CreateInput from "@/components/CreateInput/CreateInput";

export default function Home() {
  return (
    <section className="max-w-xl mx-auto border-r border-l min-h-screen">
      <div className="py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <CreateInput />
    </section>
  );
}

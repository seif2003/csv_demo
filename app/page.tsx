import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-[100vw] h-[100vh] flex items-center justify-center">
      <a href="/csv">
        <Button className="text-[32px] px-14 py-8">CSV</Button>
      </a>
    </main>
  );
}

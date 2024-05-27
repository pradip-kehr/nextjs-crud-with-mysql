import ExportButton from "@/components/ExportButton";
import PostListing from "@/components/PostListing";
// import { unstable_noStore } from "next/cache";
import Link from "next/link";
export default async function Home() {
  // unstable_noStore();
  return (
    <main className="pt-10 px-10 pb-2">
      <div className="border-b-2 border-b-slate-300 flex justify-between pb-2">
        <span className="font-bold text-3xl">
          Posts
        </span>
        <div>
          <ExportButton />
          <Link href={'/add'} className="bg-blue-600 hover:bg-blue-800 py-3 text-white rounded-md px-4">Add</Link>
        </div>
      </div>
      <PostListing />
    </main>
  );
}

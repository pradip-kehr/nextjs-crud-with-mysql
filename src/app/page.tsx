import PostActions from "@/components/PostActions";
import { deletePost } from "@/controller/Post";
import Link from "next/link";

export default async function Home() {
  const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
    next: {
      revalidate: 0
    }
  });
  const posts = await postsResponse.json();
  return (
    <main className="pt-10 px-10 pb-2">
      <div className="border-b-2 border-b-slate-300 flex justify-between pb-2">
        <span className="font-bold text-3xl">
          Posts
        </span>
        <Link href={'/add'} className="bg-blue-600 hover:bg-blue-800 py-3 text-white rounded-md px-4">Add</Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              posts?.data?.map((value: Post, index: number) => {
                return (
                  <tr className="bg-white border-b" key={index}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {value.title}
                    </th>
                    <td className="px-6 py-4">
                      {value.body}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <PostActions id={value.id} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </main>
  );
}

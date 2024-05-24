import PostForm from '@/components/PostForm'
import React from 'react'

export const metadata = {
    title: 'Edit Post'
}
type PropsType = {
    params: {
        id: string;
    }
}
const EditPost = async ({ params }: PropsType) => {
    const postResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params.id}`, { next: { revalidate: 10, tags: ['editPost'] } });
    const post = await postResponse.json();
    return (
        <div className="pt-10 px-10 pb-2">
            <div className="border-b-2 border-b-slate-300 flex justify-between pb-2 font-bold text-3xl">
                Edit Post
            </div>
            <PostForm post={post} />
        </div>
    )
}

export default EditPost
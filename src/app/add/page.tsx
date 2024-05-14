import PostForm from '@/components/PostForm'
import React from 'react'


const AddPost = () => {
    return (
        <div className="pt-10 px-10 pb-2">
            <div className="border-b-2 border-b-slate-300 flex justify-between pb-2 font-bold text-3xl">
                Add Post
            </div>
            <PostForm />
        </div>
    )
}

export default AddPost
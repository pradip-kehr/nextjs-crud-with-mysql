"use client";
import React, { useEffect, useState } from 'react'
import PostActions from './PostActions';


const PostListing = () => {
    const [posts, setPosts] = useState<Post[]>([])
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`, {
            cache: 'no-store',
        });
        const posts = await postsResponse.json();
        if (posts?.data) {
            setPosts(posts?.data);
        }
    }
    return (
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
                        posts?.map((value: Post, index: number) => {
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
    )
}

export default PostListing
"use client"
import { exportPosts } from '@/controller/Post'
import Link from 'next/link'
import React from 'react'

type Props = {}

const ExportButton = (props: Props) => {
    const exportPostsHandler = async () => {
        const data = await exportPosts();
        console.log(data, 'pkk');

    }
    return (
        <Link target='_blank' href="/api/post/export" /* onClick={exportPostsHandler} */ className="bg-blue-600 hover:bg-blue-800 py-1 mr-2 text-white rounded-md px-4">Hello</Link>
    )
}

export default ExportButton
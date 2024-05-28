import ImportPosts from '@/components/ImportPosts'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Import = (props: Props) => {
    return (
        <div className="pt-10 px-10 pb-2">
            <div className="border-b-2 border-b-slate-300 flex justify-between pb-2 ">
                <span className='font-bold text-3xl'>Import Posts</span>
                <Link href="/" className="border hover:bg-slate-200 py-3 mr-2 text-slate-700 rounded-md px-4">Go Back</Link>
            </div>

            <div className='mt-3'>
                Download template from&nbsp;
                <Link
                    href={'/_static/posts.xlsx'}
                    className='text-blue-700 hover:underline'
                    target="_blank"
                    rel="noreferrer"
                    download>here.</Link>
            </div>
            <ImportPosts />
        </div>
    )
}

export default Import
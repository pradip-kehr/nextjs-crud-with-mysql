"use client";
import { deletePost } from '@/controller/Post';
import Link from 'next/link';
import React from 'react'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type Props = {
    id: number;
}

const PostActions = ({ id }: Props) => {
    const deletePostHandler = () => {
        Swal.fire({
            title: "Do you want to delete this post?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: '#d22d2dd6',
            denyButtonText: `Cancel`
        }).then((result) => {
            if (result.isConfirmed) {
                deletePost(id).then((response) => {
                    if (response?.success) {
                        toast.success(response?.message);
                    } else {
                        toast.error(response?.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        });

    }
    return (
        <>
            <Link href={`/edit/${id}`} className="text-indigo-600 hover:text-indigo-800">Edit</Link>
            <button type="button" onClick={deletePostHandler} className="ml-4 text-red-600 hover:text-red-800">Delete</button>
        </>
    )
}

export default PostActions;
"use client";
import { updateOrCreatePost } from '@/controller/Post';
import { PostFormValidationSchema } from '@/validationShema';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

type Props = {
    post?: Post
}

const PostForm = ({ post }: Props) => {
    const [initialValues, setInitialValues] = useState<Omit<Post, 'id'>>({
        title: '',
        body: ''
    });
    const router = useRouter();
    useEffect(() => {
        if (post) {
            setInitialValues(post);
        }
    }, [post]);
    const onSubmitHandler = (values: Omit<Post, 'id'>) => {
        updateOrCreatePost(values, (post?.id || 0)).then((response) => {
            if (response.success) {
                toast.success(response?.message);
                router.push('/');
            } else {
                toast.error(response?.message);
            }
        }).catch((err) => {
            toast.error(err?.response?.message);
        });

        // fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post?.id}`, {
        //     method: "PUT",
        //     body: JSON.stringify(values)
        // }).then(() => {
        //     router.refresh();
        // });
    }
    return (
        <div>
            <Formik
                enableReinitialize={true}
                onSubmit={onSubmitHandler}
                initialValues={initialValues}
                validationSchema={PostFormValidationSchema}
            >
                {({ }) => {
                    return (
                        <Form>
                            <div className='mt-5'>
                                <label htmlFor="title">Title</label>
                                <Field id="title" name="title" className="px-2 block w-full h-9  border-slate-300 border focus:border-blue-600 rounded-md mt-2" />
                                <ErrorMessage component={'div'} className='text-red-600' name='title' />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="body">Description</label>
                                <Field id="body" as={'textarea'} rows={5} name="body" className="px-2 block w-full border border-slate-300 focus:border-blue-600 rounded-md mt-2" />
                                <ErrorMessage className='text-red-600' component={'div'} name='body' />
                            </div>
                            <div className='flex justify-end mt-5'>
                                <Link href={'/'} className='border border-slate-400 hover:bg-slate-200 py-3 rounded-md px-4 mr-2'>Cancel</Link>
                                <button type='submit' className='bg-blue-600 hover:bg-blue-800 py-3 text-white rounded-md px-4'>Save</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>

    )
}

export default PostForm
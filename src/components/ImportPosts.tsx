"use client"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import InputFile from './component/input-file'
import { addQueue, importPosts } from '@/controller/Post'
import { toast } from 'react-toastify'
import * as yup from "yup"

type Props = {}

const ImportPosts = (props: Props) => {
    const supportedFileTypes = ['application/vnd.ms-excel', 'text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const validations = yup.object({
        file: yup.mixed()
            .test('fileFormat', 'Unsupported file format', (value) => {
                if (!value) return true; // Allow empty files
                const file = value as File;
                return supportedFileTypes.includes(file?.type);
            })
            .required('please select file to import.')
    });
    const importFile = (values: { file: File | '' }) => {
        if (values.file) {
            const data = new FormData();
            data.append('file', values!.file);
            importPosts(data).then((response) => {
                if (response?.success) {
                    toast.success(response.message)
                } else {
                    toast.error(response.message)
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => { });
        }
    }
    return (
        <div className='mt-5'>
            <Formik initialValues={{ file: '' }} validationSchema={validations} onSubmit={importFile}>
                {({ setFieldValue, errors, values }) => {
                    console.log(errors, values);

                    return (
                        <Form>
                            <div className="flex flex-col items-start mx-auto p-6 rounded-lg shadow-lg">
                                <div>
                                    <h3 className="text-lg font-semibold">Upload a File</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Select a file to upload. Supported formats: xlsx, csv.</p>
                                </div>
                                <div className="w-full flex items-center gap-2">
                                    <InputFile onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const files = e?.target?.files;
                                        if (files) {
                                            setFieldValue('file', files[0]);
                                        }
                                    }} />
                                    <button
                                        className="justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-900/90 focus:outline-none focus:ring-2 focus:ring-gray-950 "
                                        type="submit"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="mr-2 h-4 w-4"
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" x2="12" y1="3" y2="15"></line>
                                        </svg>
                                        Upload
                                    </button>
                                </div>
                                <ErrorMessage name='file' component={'div'} className='text-red-500' />
                                <button type="button" onClick={() => {
                                    addQueue();
                                }}>start</button>
                            </div>
                        </Form>
                    )
                }}
            </Formik >
        </div>
    )
}

export default ImportPosts
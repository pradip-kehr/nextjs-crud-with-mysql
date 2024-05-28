import { Field } from 'formik'
import React from 'react'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputFile = ({ onChange }: Props) => {
  return (
    <>
      <input
        onChange={onChange}
        name="file"
        className="h-10 px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400  focus:outline-none"
        id="file-upload"
        type="file"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />

    </>
  )
}

export default InputFile
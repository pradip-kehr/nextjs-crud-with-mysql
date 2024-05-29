import React from 'react'

type Props = {
    name: string;
}

const ImportComplete = ({ name }: Props) => {
    return (
        <div>Hello, {name}</div>
    )
}

export default ImportComplete
import React from 'react';

interface EmailProps {
    url: string;
}

export const Email = ({ url }: EmailProps) => (
    <div>
        <p>Hello, world!</p>
        <a href={url}>Click here</a>
    </div>
);

import React from 'react'

const FormTextArea = ({ type = 'text', placeholder, }) => {
    return (
        <textarea
            type={type}
            placeholder={placeholder}
            className='p-2 bg-gray-100 outline-none rounded px-4 py-2 w-full' >
        </textarea>
    )
}

export default FormTextArea;

import React from 'react'

const FormTextArea = ({ type = 'text', name, placeholder, register, error }) => {
    return (
        <div>
            <textarea
                name={name}
                type={type}
                placeholder={placeholder}
                className='p-2 bg-gray-100 outline-none rounded px-4 py-2 w-full'
                {...register}
            >
            </textarea>
            {error && <small className='text-red-500'>{error.message}</small>}
        </div>
    )
}

export default FormTextArea;

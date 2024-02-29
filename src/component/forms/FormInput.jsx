import React from 'react'

const FormInput = ({ type = 'text', placeholder, }) => {
    return (
        <div>
            <input type={type} placeholder={placeholder} className='p-2 bg-gray-100 outline-none rounded px-4 py-2 w-full' />

        </div>
    )
}

export default FormInput

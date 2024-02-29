import React from 'react'

const FormInput = ({ type = 'text', placeholder, register, name, error }) => {
    return (
        <div>
            <input type={type} name={name} placeholder={placeholder} className='p-2 bg-gray-100 outline-none rounded px-4 py-2 w-full'
                {...register}
            />
            {error && <small className='text-red-500'>{error.message}</small>}
        </div>
    )
}

export default FormInput

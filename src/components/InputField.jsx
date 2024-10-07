import React from 'react'

const InputField = ({ label, id ,type}) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-[#9A9A9A]">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    className="block w-full outline-none rounded-[12px] border-0 py-2 px-4 text-[#AD957B] bg-[#484848] sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    )
}

export default InputField
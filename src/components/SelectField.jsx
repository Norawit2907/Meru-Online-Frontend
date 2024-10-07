import React from 'react'

const SelectField = ({ label, id, name, options, defaultValue }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-[#9A9A9A]">
                {label}
            </label>
            <select
                id={id}
                name={name}
                defaultValue={defaultValue}
                className="mt-2 block w-[200px] outline-none rounded-[12px] border-0 py-2 px-4 text-[#AD957B] bg-[#484848] sm:text-sm sm:leading-6"
            >
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default SelectField
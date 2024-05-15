'use client';

const SubmitButton = ({ label, color }: { label: string, color: string }) => {
    return (
        <button
            type="submit"
            className={`bg-${color}-600 border-2 py-2 px-4 rounded-md hover:bg-${color}-700 focus:outline-none focus:ring focus:border-black text-gray-300`}
        >
            {label}
        </button>
    )
}

export default SubmitButton
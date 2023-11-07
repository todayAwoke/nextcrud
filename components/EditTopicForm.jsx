'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
export default function EditTopicForm({ id, title, description }) {
    const router = useRouter();
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
                method: PUT,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ newTitle, newDescription })
            });
            if (!res.ok) {
                throw new Error("failed to update ")
            }
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return <form onSubmit={handleSubmit} className='flex flex-col py-2'>
        <input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            className='border border-slate-500 px-8 py-3'
            type='text' placeholder='topic title' />
        <input
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            className='border border-slate-500 px-8 py-3'
            type='text' placeholder='topic description' />
        <button type='submit' className='bg-green-600 font-bold text-white py-3 px-6 w-fit '>
            Edit Topic
        </button>
    </form>
}
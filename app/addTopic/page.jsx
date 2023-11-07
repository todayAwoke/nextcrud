'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
export default function AddTopic() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert('Please enter a description and title');
            return;
        }
        try {
            const res = await fetch("http://localhost:3000/api/topics", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({ title, description })
            });
            if (res.ok) {
                router.push('/');
            }
            else {
                throw new Error("failed to create topic")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return <form onSubmit={submitHandler} className='flex'>
        <input
            className='border border-slate-500 px-8 py-2'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='topic title' />
        <input
            className='border border-slate-500 px-8 py-2'
            type='text'
            value={description}
            onChange={(e) => {
                setDescription(e.target.value);
            }}
            placeholder='topic description' />
        <button type='submit' className='bg-green-600 font-bold text-white py-3 px-6 w-fit '>
            Add Topic
        </button>
    </form>
}


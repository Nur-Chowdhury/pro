import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { addTaskRoute, findUserByIDRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function AddTask() {
    const [form, setForm] = useState({
        questions:[]
    });

    const [question, setQuestion] = useState({})
    const [index, setIndex] = useState(0);

    const {userID} = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${findUserByIDRoute}?id=${userID}`);
                setUserInfo(response.data);
                console.log(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load User');
                setLoading(false);
            }
        };
        fetchUser();
    }, [userID]);

    const handleSelectChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.id = userInfo._id;
        console.log('Form submitted:', form);


        try {
            const response = await fetch(addTaskRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const result = await response.json();
            if (response.ok) {
                toast.success(`Form submitted successfully: ${result.message}`);
                setForm({ questions:[] });
            } else {
                toast.error(`Error submitting form: ${result.message}`);
            }
        } catch (error) {
            toast.error(`Error submitting form: ${error.message}`);
        }
    };

    const handleDone = (e) => {
        e.preventDefault();
        if(question.type && question.question && question.bangla && question.answer){
            if(question.type==="MCQ"){
                if(question.options){
                    const arr = question.options.split(', ');
                    question.options = arr;
                    const updatedQuestions = [...form.questions];
                    updatedQuestions[index] = question;
                    setForm({ ...form, questions: updatedQuestions });
                    setIndex(-1);
                    setQuestion({});
                }else{
                    toast.error("All the fields are required!")
                }
            }else{
                const updatedQuestions = [...form.questions];
                updatedQuestions[index] = question;
                setForm({ ...form, questions: updatedQuestions });
                setIndex(-1);
                setQuestion({});
            }
        }else{
            toast.error("All the fields are required!")
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if(question.type && question.question && question.bangla && question.answer){
            if(question.type==="MCQ"){
                if(question.options){
                    const arr = question.options.split(', ');
                    question.options = arr;
                    const updatedQuestions = [...form.questions];
                    updatedQuestions[index] = question;
                    setForm({ ...form, questions: updatedQuestions });
                    setIndex(index+1);
                    setQuestion({});
                }else{
                    toast.error("All the fields are required!")
                }
            }else{
                const updatedQuestions = [...form.questions];
                updatedQuestions[index] = question;
                setForm({ ...form, questions: updatedQuestions });
                setIndex(index+1);
                setQuestion({});
            }
        }else{
            toast.error("All the fields are required!")
        }
    };

    return (
        <div>
            <div className='flex items-center justify-center py-8 text-3xl font-extrabold text-white bg-blue-500'>
                Admin Panel
            </div>
            <div className='flex flex-col items-center mt-4 px-24 text-xl font-bold'>
                Add Task
                <form onSubmit={handleSubmit} className='w-[60%] my-8 text-lg font-normal flex flex-col items-start justify-start gap-4'>
                    <div className=' w-full flex justify-start py-4 text-xl'>
                        (Fields with * are Required)
                    </div>
                    <div className='w-full'>
                        <label htmlFor="inputType">*Type:</label>
                        <select 
                            name="type" 
                            id="type" 
                            value={form.type || ''} 
                            onChange={handleSelectChange}
                            className='border border-gray-300 rounded-md p-2'
                            required
                        >
                            <option value="" disabled>Select type</option>
                            <option value="silver" className='text-gray-700'>Silver</option>
                            <option value="gold" className='text-gray-700'>Gold</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="question">*Task Name:</label>
                        <input
                            name="name" 
                            id="name" 
                            value={form.name || ''} 
                            onChange={handleSelectChange}
                            className=' w-full border-2 rounded-md border-black'
                            required
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor="question">*Task Reward:</label>
                        <input
                            name="reward" 
                            id="reward" 
                            value={form.reward || ''} 
                            onChange={handleSelectChange}
                            className=' w-full border-2 rounded-md border-black'
                            required
                        />
                    </div>
                    <div className='w-full'>
                        <div className=' flex items-center justify-center'>Add Questions</div>
                        <div className=' flex flex-col gap-2'>
                            <div className=' my-2 font-medium'>Question Added: {form.questions.length}</div>
                            <div className='w-full'>
                                <label htmlFor="inputType">*Question Type:</label>
                                <select 
                                    name="type" 
                                    id="type" 
                                    value={question.type || ''} 
                                    onChange={handleQuestionChange}
                                    className='border border-gray-300 rounded-md p-2'
                                >
                                    <option value="" disabled>Question Type</option>
                                    <option value="MCQ" className='text-gray-700'>MCQ</option>
                                    <option value="Gap" className='text-gray-700'>Gap</option>
                                </select>
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="question">*Question:{" "}</label>
                                <input
                                    name="question" 
                                    id="question" 
                                    value={question.question || ''} 
                                    onChange={handleQuestionChange}
                                    className=' w-full border-2 rounded-md border-black'
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="bangla">*In Bangla:</label>
                                <input
                                    name="bangla" 
                                    id="bangla" 
                                    value={question.bangla || ''} 
                                    onChange={handleQuestionChange}
                                    className=' w-full border-2 rounded-md border-black'
                                />
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="answer">*Answer: [Please insert the character ("*") if there is no answer.]:</label>
                                <input
                                    name="answer" 
                                    id="answer" 
                                    value={question.answer || ''} 
                                    onChange={handleQuestionChange}
                                    className=' w-full border-2 rounded-md border-black'
                                />
                            </div>
                            {question.type==="MCQ" && <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="options">*Options [Please separate all the options by (", ") ]:</label>
                                <input
                                    name="options" 
                                    id="options" 
                                    value={question.options || ''} 
                                    onChange={handleQuestionChange}
                                    className=' w-full border-2 rounded-md border-black'
                                />
                            </div>}
                            <div className=' flex items-center justify-between'>
                                <div className={` px-2 py-1 rounded-md bg-blue-700 text-white ${index===-1 ? ' opacity-30 cursor-not-allowed': ' cursor-pointer'}`}
                                    disabled={index===-1}
                                    onClick={handleAdd}
                                >Add Another</div>
                                <div className={` px-2 py-1 rounded-md bg-blue-700 text-white ${index===-1 ? ' opacity-30 cursor-not-allowed': ' cursor-pointer'}`}
                                    disabled={index===-1}
                                    onClick={handleDone}
                                >Done</div>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full flex items-center justify-center'>
                        <button type="submit" 
                            className='mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

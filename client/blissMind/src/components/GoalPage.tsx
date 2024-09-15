import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {goals} from '../utils/Goals';
import {FaCheckCircle, FaClock} from 'react-icons/fa';

const MAX_TIME_MINUTES = 120; // Maximum allowed time in minutes

const GoalPage: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const goal = goals.find(goal => goal.id === parseInt(id));

    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [inputTime, setInputTime] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        // let timer: NodeJS.Timeout;
        let timer: number;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleStartTimer = () => {
        const totalMinutes = parseInt(inputTime);
        if (!isNaN(totalMinutes) && totalMinutes > 0 && totalMinutes <= MAX_TIME_MINUTES) {
            setTimeLeft(totalMinutes * 60);
            setErrorMessage('');
        } else {
            setErrorMessage(`Please enter a time between 1 and ${MAX_TIME_MINUTES} minutes.`);
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    if (!goal) {
        return <p className="text-red-500 text-center mt-10">Goal not found</p>;
    }

    return (
        <div className="container my-8 mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4">{goal.title}</h1>
            <p className="text-gray-600 text-center mb-8">{goal.description}</p>
            <div className="flex justify-center items-center mb-4">
                <FaClock className="text-3xl text-blue-500 mr-2"/>
                <h2 className="text-2xl font-bold">Enter time (in minutes)</h2>
            </div>
            <div className="flex justify-center items-center mb-4">
                <input
                    type="number"
                    value={inputTime}
                    onChange={(e) => setInputTime(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg mr-2"
                    placeholder={`1 to ${MAX_TIME_MINUTES}`}
                />
                <button
                    onClick={handleStartTimer}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Start Timer
                </button>
            </div>
            {errorMessage && (
                <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}
            <div className="flex justify-center items-center mb-8">
                <h2 className="text-2xl font-bold">Timer</h2>
            </div>
            <div className="flex justify-center items-center text-4xl font-bold text-gray-800 mb-8">
                {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center items-center mb-8">
                <FaCheckCircle className="text-3xl text-green-500 mr-2"/>
                <h2 className="text-2xl font-bold">Instructions</h2>
            </div>
            <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg">
                {goal.instructions.map((instruction, index) => (
                    <li key={index} className="mb-2">{instruction}</li>
                ))}
            </ul>
        </div>
    );
};

export default GoalPage;

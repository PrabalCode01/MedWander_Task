import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-4 sm:mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">Welcome</h2>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                        to="/formA"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Form A
                    </Link>
                    <Link
                        to="/formB"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Form B
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { CiNoWaitingSign } from "react-icons/ci";
import { FiRefreshCcw } from "react-icons/fi";

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" className='flex flex-col items-center justify-center h-screen bg-transparent gap-8'>
            <CiNoWaitingSign className='text-neutral-500 text-2xl lg:text-4xl' />
            <h1 className='text-neutral-100 text-center text-xl lg:text-4xl'>Something went wrong!</h1>
            <p className='font-bold text-sm md:text-base lg:text-2xl text-center w-full lg:max-w-[50%]'>{error.message || "We Couldn't connect to the server (API error). <br/> Please try again in a fews moments"}</p>
            <button className='border border-neutral-600 bg-neutral-600 px-[8px] py-[4px] lg:px-[16px] lg:py-[8px] rounded-lg font-medium flex justify-center items-center space-x-2' onClick={resetErrorBoundary}>
                <FiRefreshCcw className='inline-block' />
                <span>Retry</span>
                </button>
        </div>
    );
}

const ErrorBoundary = ({ children }) => {
    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                window.location.reload();
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;
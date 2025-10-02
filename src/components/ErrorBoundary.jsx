import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { CiNoWaitingSign } from "react-icons/ci";

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" className='flex flex-col items-center justify-center h-screen bg-neutral-900 gap-8'>
            <CiNoWaitingSign className='text-neutral-500 text-9xl' />
            <h1 className='text-neutral-500 text-4xl'>Something went wrong!</h1>
            <p className='font-bold text-2xl'>{error.message || "We Couldn't connect to the server (API error). <br/> Please try again in a fews moments"}</p>
            <button className='border border-neutral-600 bg-neutral-600 p-[8px] rounded-2xl font-medium' onClick={resetErrorBoundary}>Retry</button>
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
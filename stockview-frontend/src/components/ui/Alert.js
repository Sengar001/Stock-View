import React from 'react';
import { FiX, FiCheck, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose }) => {
    const alertConfig = {
        success: {
            bg: 'bg-success-50',
            text: 'text-success-700',
            icon: <FiCheck className="text-success-500" />,
        },
        error: {
            bg: 'bg-danger-50',
            text: 'text-danger-700',
            icon: <FiAlertTriangle className="text-danger-500" />,
        },
        warning: {
            bg: 'bg-amber-50',
            text: 'text-amber-700',
            icon: <FiAlertTriangle className="text-amber-500" />,
        },
        info: {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            icon: <FiInfo className="text-blue-500" />,
        },
    };

    const config = alertConfig[type] || alertConfig.info;

    return (
        <div className={`${config.bg} rounded-lg p-4 mb-4`}>
            <div className="flex">
                <div className="flex-shrink-0 mt-0.5">
                    {config.icon}
                </div>
                <div className="ml-3 flex-1">
                    <p className={`text-sm ${config.text}`}>
                        {message}
                    </p>
                </div>
                {onClose && (
                    <div className="ml-auto pl-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`rounded-md ${config.bg} inline-flex text-gray-400 hover:text-gray-500 focus:outline-none`}
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alert;
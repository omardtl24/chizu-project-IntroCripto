// import React from 'react';
// // solo shimmer
// export const LoadingCard: React.FC = () => {
//     const cardStyle = 'bg-gray-50 border-2 border-gray-200 p-6 rounded-lg';
//     const imageStyle = 'rounded-lg h-48 w-full bg-gray-300 mb-4 shimmer';
//     const textStyle = 'h-6 bg-gray-300 rounded mb-2 shimmer';
//     const subTextStyle = 'h-4 bg-gray-300 rounded mb-2 shimmer';
    
//     return (
//         <div className={cardStyle}>
//             <div className={imageStyle}></div>
//             <div className={textStyle}></div>
//             <div className="flex items-center gap-2 mb-2">
//                 <div className="h-4 w-4 bg-gray-300 rounded"></div>
//                 <div className={subTextStyle}></div>
//             </div>
//             <div className="flex justify-between items-center mb-2">
//                 <div className={subTextStyle}></div>
//                 <div className="h-4 w-16 bg-gray-300 rounded"></div>
//             </div>
//             <div className="flex justify-between items-center mt-4">
//                 <div className={subTextStyle}></div>
//                 <div className={subTextStyle}></div>
//             </div>
//         </div>
//     );
// };

import React from 'react';
// shimmer + pulse

export const LoadingCard: React.FC = () => {
    const cardStyle = 'bg-gray-50 border-2 border-gray-200 p-6 rounded-lg animate-pulse cursor-pointer';
    const imageStyle = 'rounded-lg h-48 w-full bg-gray-300 mb-4 shimmer animate-pulse';
    const textStyle = 'h-6 bg-gray-300 rounded mb-2 shimmer animate-pulse';
    const subTextStyle = 'h-4 bg-gray-300 rounded mb-2 shimmer animate-pulse';
    
    return (
        <div className={cardStyle}>
            <div className={imageStyle}></div>
            <div className={textStyle}></div>
            <div className="flex items-center gap-2 mb-2">
                <div className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
                <div className={subTextStyle}></div>
            </div>
            <div className="flex justify-between items-center mb-2">
                <div className={subTextStyle}></div>
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className={subTextStyle}></div>
                <div className={subTextStyle}></div>
            </div>
        </div>
    );
};


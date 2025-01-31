import React from 'react';
 import { AiFillStar } from 'react-icons/ai'; 


const CustomRateStar = ({ rate }) => {
    const totalStars = 5;

    return (<div className="rating">
         {Array.from({ length: totalStars }, (_, index) => 
            (
            <AiFillStar key={index} className={`rating_star ${index < rate ? 'filled' : 'unfilled'}`} />

            ))} 
         
         </div>);
};

export default CustomRateStar;
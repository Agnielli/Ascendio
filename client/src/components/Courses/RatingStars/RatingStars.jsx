import React, { useEffect, useState } from 'react'

export const RatingStars = ({numberstars}) => {

  const [ratingUser, setRatingUser] = useState([]);
  let stars = new Array(5);

  stars.fill("☆")
  console.log(numberstars);
  console.log(stars);  /* ⭐🤍❤️★☆ */
  console.log(ratingUser);
  
    
    
      let prueba = stars.map((elem,i)=>{
        console.log(i);
      if(i < numberstars ){
        return "★"
      }else{
        return "☆"
      }
    })
    console.log(prueba);
    
  
  


  return (
    <div>{prueba.join("")}</div>
  )
}

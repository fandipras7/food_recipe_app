import React from "react";
import style from "./card.module.css";

const Card = ({ img, title, onClick, children, ...props }) => {
  return (
    <>
      <div className={`card p-2 mb-5 ${style.cardShadow}`}>
        {children}
        <div className={style.image}>
          <img className="img-fluid" src={img} alt="" />
        </div>
        <div className="card-body">
          <h5 onClick={onClick} className={`${style.title} text-center`}>
            {title}
          </h5>
          {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
        </div>
      </div>
    </>
  );
};

export default Card;

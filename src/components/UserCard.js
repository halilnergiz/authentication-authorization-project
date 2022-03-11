import React from 'react'
import '../css/style.css';

const UserCard = (props) => {

    return (
        <div className="user-card">
            <div className="card_content">
                <h3 className="card_header">{props.name}</h3>
                <p className="card_info">{props.description}</p>
                <div className='flip-card'>
                    <button className="card-front">Buy</button>
                    <button className="card-back">{props.price}</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard

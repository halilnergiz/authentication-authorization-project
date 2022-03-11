import axios from 'axios'
import React, { useState } from 'react'
import '../css/card.css'

const Card = (props) => {

    return (
        <div className="card">
            <div className="card_content">
                <h3 className="card_header">{props.name}</h3>
                <p className="card_info">{props.description}</p>
                <div className='options'>
                    <a href="#edit-popup"><button className="card_button" onClick={props.getProductId}>Edit</button></a>
                    <i className="fa-solid fa-trash" onClick={props.delete}></i>
                    <span className='id' >

                    </span>
                </div>
            </div>
        </div>
    )
}

export default Card

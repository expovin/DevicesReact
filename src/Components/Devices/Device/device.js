import React from 'react';
import './device.css'

const device = (props) => (
    <div className="card col-md-3 col-sm-4">
        <div className="cardImg">
            <img src={props.urlFoto} className="card-img-top" alt={props.urlFoto}/>
        </div>
        <div className="card-body">
            <h5 className="card-title">{props.Nome}</h5>
            <p className="card-text">{props.Site}</p>
        </div> 
        <div className="card-body">
        <button type="button" className="btn btn-primary" onClick={props.clicked}>Dettagli</button>
        </div>               
    </div>
);

export default device;
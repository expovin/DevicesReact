import React from 'react';
import {Button, Card, Row, Col} from 'react-bootstrap';
import './device.css'

const device = (props) => (
    <Col sm={3}>
        <Card>
            <div className="imgCont">
                <Col xs lg="1"></Col>
                <Col xs lg="10">
                    <Card.Img  src={props.urlFoto} variant="top"/>
                </Col>
                <Col xs lg="1"></Col>
            </div>
            <Card.Body>
                <Card.Title>{props.Nome}</Card.Title>
                <Card.Text>{props.Site}</Card.Text>
                <Button variant="primary" onClick={props.clicked}>Dettagli</Button>
            </Card.Body>

        </Card>             
    </Col>
);

export default device;
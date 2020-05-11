import React, { Component } from 'react';
import {Button, Form, Modal,Container, Row, Col } from 'react-bootstrap';



class NewConnectionModal extends Component {

    state = {
        device_id: null,
        interface_id:null,
        Iface : []
    }


    handleChangeDevice = (event) => {

        this.setState({device_id : event.target.value})
        const Iface = this.props.availableDevices
        .filter( (device) => {
            this.setState({Interface_id : device.Interface_id});
            return device.Device_Id == event.target.value
        })
        .map( (device,idx) =>  <option key={idx} value={device.Interface_id}>{device.Interface_id}</option>)     

        this.setState({Iface : Iface})
    }    

    handlerChanceIface = (event) => {
        this.setState({Interface_id : event.target.value});
    }

    render(){

        let uniques = [];
        let options = [{Device_Id:null, Nome:"Please select device"}, ...this.props.availableDevices]

        .filter( (device, idx) => {
            if(uniques.indexOf(device.Device_Id) === -1) {
                uniques.push(device.Device_Id);
                return device
            }
        })
        .map( (device,idx) =>  <option key={idx} value={device.Device_Id}>{device.Nome}</option>)                         

        let MyModal =             
            <Modal show={this.props.show} onHide={() => this.props.modalHandler(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Connessione</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>Vengono mostrati i soli device con connessioni disponibili dello stesso tipo</p>
            <Container>
                <Row>
                    <Col>
                        <Form.Group controlId="connForm.device">                
                            <Form.Label>Device</Form.Label>
                                <Form.Control as="select" onChange={this.handleChangeDevice} >
                                    {options}
                                </Form.Control>
                        </Form.Group>                    
                    </Col>
                    <Col>
                        <Form.Group controlId="connForm.interface">                
                            <Form.Label>Interfaccia</Form.Label>
                                <Form.Control as="select" onChange={this.handlerChanceIface} >
                                {this.state.Iface}
                                </Form.Control>
                        </Form.Group>                         
                    </Col>
                    
                </Row>
            </Container>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() =>this.props.modalHandler(null)}> Close</Button>
                <Button variant="primary" onClick={() => this.props.modalHandler(this.state.device_id, this.state.Interface_id)}>Save Changes</Button>
            </Modal.Footer>
            </Modal>

        return(
            <div>
                {MyModal ? MyModal : null}
            </div>
          
        )

    }
}

export default NewConnectionModal
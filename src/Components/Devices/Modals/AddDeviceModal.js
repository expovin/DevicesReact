import React, { Component } from 'react';
import {Button, Form, Modal, Row, Col } from 'react-bootstrap';
import Interfaccie from '../Dettaglio_Device/Connessioni/interfaccie'
import './modal.css'

class AddDeviceModal extends Component {

    form = {};

    state = {
        validated:false
    }

    
    

    handleSubmit = (event) => {
        event.preventDefault();

        console.log("[handleSubmit]")
        console.log(this.form);
    }

    handleChangeNome = (event) => {
        if(event.target.name === "DHCP")
            this.form[event.target.name]=event.target.checked
        else
            this.form[event.target.name]=event.target.value
    }

 
    render(){

        console.log(this.props.tipo_device);
        let options = [{TipoDevice_Id:999, Descrizione:"Selezionare tipo dispositivo"},...this.props.tipo_device].map( tipo =>  <option key={tipo.TipoDevice_Id} value={tipo.TipoDevice_Id}>{tipo.Descrizione}</option>)

        let MyModal =     
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>     
            <Modal  id="AddDeviceModal" 
                    show={this.props.show} 
                    onHide={() => this.props.modalHandler(null)}
                    aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton>
                    <Modal.Title>Nuovo device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                    <Row>
                        <Col>
                            <Form.Group controlId="deviceName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" name="nome" placeholder="Nome Device" onChange={this.handleChangeNome} required/>                            
                            </Form.Group>    
                            <Form.Group controlId="deviceSite">
                                <Form.Label>Sito</Form.Label>
                                <Form.Control type="text" name="Site" placeholder="Luogo in cui si trova il dispositivo" onChange={this.handleChangeNome} required/>
                            </Form.Group>      
                            <Form.Group controlId="deviceModel">
                                <Form.Label>Modello</Form.Label>
                                <Form.Control type="text" name="Modello" placeholder="Modello del dispositivo (Es. Raspberry Pi 3)" onChange={this.handleChangeNome}/>
                            </Form.Group>                                                                        
                        </Col>
                        <Col>
                            <Form.Group controlId="deviceType">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select" name="Tipo" onChange={this.handleChangeNome} >
                                    {options}
                                </Form.Control>

                               
                            </Form.Group>                        
                            <Form.Group controlId="urlAccesso">
                                <Form.Label>Url console</Form.Label>
                                <Form.Control type="text" name="urlAccesso" placeholder="Indirizzo di accesso se esistente" onChange={this.handleChangeNome}/>
                            </Form.Group>  
                            <Form.Group controlId="urlFoto">
                                <Form.Label>Url console</Form.Label>
                                <Form.Control type="text" name="urlFoto" placeholder="Url foto device" onChange={this.handleChangeNome}/>
                            </Form.Group>  

                            <Form.Group controlId="urlIcon">
                                <Form.Label>Url Icona</Form.Label>
                                <Form.Control type="text" name="icon" placeholder="Icona a url di rappresentazione" onChange={this.handleChangeNome} />
                            </Form.Group>                                                
                        </Col>
                    </Row>
                   
                    <h5>Network Cards</h5>
                    <hr />
                    <Row>
                        <Col>
                            <Form.Group controlId="ipv4Eth">
                                <Form.Control type="text" name="IPV4_Eth" placeholder="Eth IPv4" onChange={this.handleChangeNome}/>
                            </Form.Group>  
                            <Form.Group controlId="MacEth">
                                <Form.Control type="text" name="Mac_Eth" placeholder="Mac IPv4"onChange={this.handleChangeNome}/>
                            </Form.Group>                                              
                        </Col>
                        <Col>
                            <Form.Group controlId="ipv4WiFi">
                                <Form.Control type="text" name="IPV4_WiFi" placeholder="WiFi IPv4" onChange={this.handleChangeNome}/>
                            </Form.Group>  
                            <Form.Group controlId="MacWiFi">
                                <Form.Control type="text" name="Mac_WiFi" placeholder="Mac WiFI" onChange={this.handleChangeNome}/>
                            </Form.Group>   

                            <Form.Group controlId="DHCP">
                                <Form.Check type="checkbox" name="DHCP" label="DHCP" onChange={this.handleChangeNome}/>
                            </Form.Group>                                                   
                        </Col>                    
                    </Row>


                    <Form.Group controlId="descrizione">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control as="textarea" rows="3" name="Descrizione" onChange={this.handleChangeNome} required />
                    </Form.Group>
             
                


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() =>this.props.modalHandler(null)}> Close</Button>
                    <Button type="primary" onClick={() => this.props.modalHandler(this.form)}>Next</Button>
                </Modal.Footer>
            </Modal>
            </Form>

            let interfaccie = <Interfaccie />

        return(
            <div>
                {MyModal ? MyModal : null}
                

            </div>
        )
    }

}

export default AddDeviceModal
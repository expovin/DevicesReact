import React, { Component } from 'react';
import Device from './Device/device'
import {Row} from 'react-bootstrap';
import {Card, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import './devices.css'

class Devices extends Component {


    render(){

        const devices = this.props.devices.map (device =>{

            return <Device  key={device.Device_Id} 
                            Nome={device.Nome} 
                            Site={device.Site} 
                            Modello={device.Modello} 
                            urlFoto={device.urlFoto} 
                            DHCP={device.DHCP} 
                            setMessages={this.props.setMessages}
                            clicked={() => this.props.deviceSelectedHandler(device.Device_Id,true)}/>
        })
        
        const addDevice = <Col sm={3}>
                                <FontAwesomeIcon onClick={() => this.props.modalHandler()} icon={faPlusSquare} className="iconAddItem fa-6x" color="gray" data-toggle="tooltip" data-placement="bottom" title="Aggiungi nuovo device"/>
                        </Col>
        

        console.log(devices)
        return(
            <Row>{devices} {addDevice}</Row>
                
            )
    }

}


export default Devices;
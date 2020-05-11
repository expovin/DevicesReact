import React, { Component } from 'react';
import Device from './Device/device'
import {Row} from 'react-bootstrap';



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

        

        return(
                <Row>{devices}</Row>
            )
    }

}


export default Devices;
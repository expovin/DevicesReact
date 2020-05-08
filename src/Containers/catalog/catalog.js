import React, { Component } from 'react';
import axios from 'axios';
import Devices from '../../Components/Devices/devices'
import DettaglioDevice from '../../Components/Devices/Dettaglio_Device/dettaglio_device'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumbs';
import './catalog.css'

class Catalog extends Component {

    state = {
        devices : [],
        selectedDeviceId: null,
        showDevices : true,
        showDettaglioDevice : false,
        Breadcrumbs : ["Catalogo"]
    }

    componentDidMount() {
        axios.get('http://localhost:3200/hw/devices')
        .then( result =>{        
            //const devices = result.data.slice(0,16);  
            this.setState({devices : result.data})  
        })
    }
    
    deviceSelectedHandler = (id, inner) => {
        let newBreadcrumbs = [...this.state.Breadcrumbs];
        if(inner) 
            newBreadcrumbs.push("Device")
        this.setState({
            selectedDeviceId : id,
            showDevices : false,
            showDettaglioDevice : true,
            Breadcrumbs :[...newBreadcrumbs]
        })
    }   
    
    navBreadcrumbsHandler = (idx, level) =>{
        let newBreadcrumbs = this.state.Breadcrumbs.splice(idx+1)
        this.setState({
            Breadcrumb : newBreadcrumbs,
            showDevices : true,
            showDettaglioDevice : false,            
        })
        
    }
    
    render(){
        return(           
            <div className="container">
                <h1>Catalogo</h1>
                <section>
                    <Breadcrumb Breadcrumbs={this.state.Breadcrumbs}
                                navBreadcrumbsHandler={this.navBreadcrumbsHandler}/>
                </section>
                <section>
                { this.state.showDevices ?  
                    <Devices    devices={this.state.devices} 
                                deviceSelectedHandler={this.deviceSelectedHandler}></Devices> : null }
                </section>
                <section>
                { this.state.showDettaglioDevice ? 
                    <DettaglioDevice Device_Id={this.state.selectedDeviceId} 
                                     deviceSelectedHandler={this.deviceSelectedHandler}/> : null }
                </section>

            </div>
        )
    }
}

export default Catalog
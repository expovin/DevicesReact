import React, { Component } from 'react';
import axios from 'axios';
import Devices from '../../Components/Devices/devices'
import DettaglioDevice from '../../Components/Devices/Dettaglio_Device/dettaglio_device'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumbs';
import './catalog.css'
import AlertMessages from'../../Components/Messages/Alert'

class Catalog extends Component {

    state = {
        devices : [],
        selectedDeviceId: null,
        showDevices : true,
        showDettaglioDevice : false,
        Breadcrumbs : ["Catalogo"],
        message : null
    }

    componentDidUpdate(){
        console.log("DidUpdate")
    }

    componentDidMount() {
        console.log("componentDidMount")
        axios.get('http://localhost:3200/hw/devices')
        .then( result =>{        
            //const devices = result.data.slice(0,16);  
            this.setState({devices : result.data})  
        })
        .catch( error =>{
            this.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile recuperare i devices "+error})
        })        
    }
    
    deviceSelectedHandler = (id, inner) => {
        console.log("deviceSelectedHandler : "+id);
        let newBreadcrumbs = [...this.state.Breadcrumbs];
        if(inner) 
            newBreadcrumbs.push("Device")

        this.setState({
            selectedDeviceId : id,
            showDevices : false,
            showDettaglioDevice : true,
            Breadcrumbs :[...newBreadcrumbs]
        }, () => {console.log(this.state); this.forceUpdate()})
        
    }   
    
    navBreadcrumbsHandler = (idx, level) =>{
        let newBreadcrumbs = this.state.Breadcrumbs.splice(idx+1)
        this.setState({
            Breadcrumb : newBreadcrumbs,
            showDevices : true,
            showDettaglioDevice : false,            
        })
        
    }

    addMessages = (message) =>{
        let messageId = Math.random().toString(20).substr(2, 6)
        message['id']=messageId;
        console.log("Aggiungo messaggio")
        this.setState({message : message})
        console.log(this.state.message);
    }

    dismissMessage = () =>{
        console.log("Dismiss message")
        this.setState({message : null})
    }
    
    render(){
        console.log("Sono in Render!")
        return(           
            <div className="container">
                <h1>Catalogo</h1>
                <section>
                    <Breadcrumb Breadcrumbs={this.state.Breadcrumbs}
                                navBreadcrumbsHandler={this.navBreadcrumbsHandler}/>
                </section>
                <section>
                    <AlertMessages message={this.state.message} 
                                    dismissMessage={this.dismissMessage} />
                </section>                
                <section>
                { this.state.showDevices ?  
                    <Devices    devices={this.state.devices} 
                                deviceSelectedHandler={this.deviceSelectedHandler}/> : null }
                </section>
                <section>
                { this.state.showDettaglioDevice ? 
                    <DettaglioDevice Device_Id={this.state.selectedDeviceId} 
                                     addMessages={this.addMessages}
                                     deviceSelectedHandler={this.deviceSelectedHandler}/> : null }
                </section>

            </div>
        )
    }
}

export default Catalog
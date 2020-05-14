import React, { Component } from 'react';
import axios from 'axios';
import Devices from '../../Components/Devices/devices'
import DettaglioDevice from '../../Components/Devices/Dettaglio_Device/dettaglio_device'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumbs';
import AlertMessages from'../../Components/Messages/Alert'
import AddDeviceModal from '../../Components/Devices/Modals/AddDeviceModal'

import './catalog.css'

class Catalog extends Component {

    state = {
        devices : [],
        selectedDeviceId: null,
        showDevices : true,
        showDettaglioDevice : false,
        Breadcrumbs : ["Catalogo"],
        message : null,
        modalNewDeviceOn : false,
        tipo_device : []
    }

    componentDidUpdate(){
        console.log("DidUpdate")
    }

    componentDidMount() {
        axios.get('http://localhost:3200/hw/devices')
        .then( result =>{        
            //const devices = result.data.slice(0,16);  
            this.setState({devices : result.data})  
        })
        .catch( error =>{
            this.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile recuperare i devices "+error})
        })     
        
        axios.get('http://localhost:3200/hw/tipo_devices')
        .then( result =>{        
            this.setState({tipo_device : result.data}) 
        })
        .catch( error =>{
            this.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile recuperare i tipo devices "+error})
        })   

    }

    getDevices = () =>{
        if(this.state.selectedDeviceId){
            if ( !this.state.DettaglioDevice || (this.state.selectedDeviceId !== this.props.Device_Id) || this.state.force_reoad){
                axios.get("http://localhost:3200/hw/device/"+this.props.Device_Id)
                .then( result =>{   
                    //console.log(result)
                    this.setState({DettaglioDevice : result.data, force_reoad:false})
                })
                .catch( error =>{                 
                    this.props.addMessages({variant:"warning", header : "Errore server", text:"Errore nel recuperare i dati dei devices dal server "+error})
                })
            }
        }
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
        }, () => { this.forceUpdate()})
        
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

    openAddDeviceModal = () =>{
        this.setState({modalNewDeviceOn : true})
    }

    modalHandler = (device) => {
        /*
        if(device == null){
            this.setState({modalNewDeviceOn : false})
            return
        }
        */
        if(device)
        {
            console.log("Acquisito device")
            console.log(device)
            axios.post('http://localhost:3200/hw/devices',{device : device})
            .then( result =>{        
                console.log(result)
                this.addMessages({variant:"success", header : "Inserimento nuovo device", text:"Device inserito correttamente "})
                this.componentDidMount();
            })
            .catch( error =>{
                this.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile aggiungere il device "+error})
            })  
        }

        this.setState({modalNewDeviceOn : false})

    }

    
    render(){
        console.log("Sono in Render!")
        return(           
            <div className="container">
                <h1>Catalogo</h1>
                <section>
                    <AddDeviceModal show={this.state.modalNewDeviceOn}
                                    modalHandler={this.modalHandler} 
                                    tipo_device={this.state.tipo_device} />
                </section>
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
                                modalHandler = {this.openAddDeviceModal}
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
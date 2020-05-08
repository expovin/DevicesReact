import React, { Component } from 'react';
import Connessioni from './Connessioni/connessioni';
import NewConnectionModal from '../Modals/NewConnection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import './dettaglio_device.css';
import axios from 'axios';


class DettaglioDevice extends Component {

    state = {
        DettaglioDevice : null,
        messages : [],
        availableConnections : []
    }

    componentDidMount() {
        if(this.props.Device_Id){
            if ( !this.state.DettaglioDevice || (this.state.DettaglioDevice && this.state.DettaglioDevice.Device_Id !== this.props.Device_Id) ){
                axios.get("http://localhost:3200/hw/device/"+this.props.Device_Id)
                .then( result =>{   
                    console.log(result)
                    this.setState({DettaglioDevice : result.data})
                })
            }
        }

    }
    
    componentDidUpdate() {
        this.componentDidMount()
    }
    
    connectHandler = (connTypeId) =>{
        axios.get("http://localhost:3200/hw/device/"+this.props.Device_Id+"/connectin_type/"+connTypeId)
        .then( result =>{   
            this.setState({availableConnections : result.data})
            
        })        
    }

    disconnectHandler = (connId) =>{
        axios.delete("http://localhost:3200/hw/device/connectin/"+connId)
        .then( result =>{   
            this.state.messages.push({level:"alert-success", body: "Connessione "+connId+" elimitata correttamente "})
            axios.get("http://localhost:3200/hw/device/"+this.props.Device_Id)
            .then( result =>{   
                console.log(result)
                this.setState({DettaglioDevice : result.data})
            })            
        })
        .catch( error =>{
            this.state.messages.push({level:"alert-error", body: "<b>Errore</b> eliminazione connessione "+connId+" :"+error})
        })
    }

    render(){

        let msgAlert=null;

        if(this.state.messages.length > 0){
            msgAlert = this.state.messages.map( message =>{
                return <div class={"alert "+message.level}>
                            {message.body}
                        </div>
            })

        }

        let body = <p>Please Select an item</p>;

        if(this.props.Device_Id){
            body = <p>Loading ... </p>
        }

        if(this.state.DettaglioDevice){
            body=<div>

                <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-sm-9">
                            <h3>{this.state.DettaglioDevice.Nome}</h3>
                        </div>
                        <div className="col-sm-3">
                            {this.state.DettaglioDevice.urlAccesso ? <a className="float-right" target="_new" href={this.state.DettaglioDevice.urlAccesso}><FontAwesomeIcon icon={faSignInAlt} size="lg" data-toggle="tooltip" data-placement="bottom" title="Accesss alla console"/></a> : null}
                            <i className="float-right"><FontAwesomeIcon icon={faEdit} size="lg" color="orange" data-toggle="tooltip" data-placement="bottom" title="Edita device"/></i>
                            <i className="float-right"><FontAwesomeIcon icon={faTrashAlt} size="lg" color="red" data-toggle="tooltip" data-placement="bottom" title="Cancella device"/></i>
                        </div>
                    </div>
                    
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={this.state.DettaglioDevice.urlFoto} className="card-img-top" alt={this.state.DettaglioDevice.urlFoto}/>
                        </div>
                        <div className="col-md-9">
                            <p>{this.state.DettaglioDevice.Descrizione}</p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <dl className="row">
                                            <dt className="col-sm-3">Eth.</dt>
                                            <dd className="col-sm-9">{this.state.DettaglioDevice.IPV4_Eth}</dd>      

                                            <dt className="col-sm-3">Site</dt>
                                            <dd className="col-sm-9">{this.state.DettaglioDevice.Site}</dd>                                 
                                        </dl>                    
                                    </div>           

                                    <div className="col-md-6">
                                        <dl className="row">
                                            <dt className="col-sm-3">WiFi</dt>
                                            <dd className="col-sm-9">{this.state.DettaglioDevice.IPV4_WiFi}</dd>      

                                            <dt className="col-sm-3">Modello</dt>
                                            <dd className="col-sm-9">{this.state.DettaglioDevice.Modello}</dd>                                 
                                        </dl>                    
                                    </div> 
                                </div>             
                        </div>
                    </div>

                    <hr/>
                    <div className="row">
                        <div className="col-sm-9">
                            <h5 className="card-title">Connessioni verso altri dispositivi</h5>
                        </div>
                        <div className="col-sm-3">
                            <i className="float-right" ><FontAwesomeIcon icon={faPlus} size="lg" color="green" data-toggle="tooltip" data-placement="bottom" title="Aggiungi connessione"/></i>
                            <i className="float-right" onClick={() => alert('Added to favorites!')}><FontAwesomeIcon icon={faTrashAlt} size="lg" color="red" data-toggle="tooltip" data-placement="bottom" title="Cancella connessione" /></i>                               
                        </div>
                    </div>
                    
                    
                        <Connessioni conn={this.state.DettaglioDevice.deviceConnections}
                                     deviceNavHandler = {this.props.deviceSelectedHandler}
                                     disconnectHandler ={this.disconnectHandler}
                                     connectHandler = {this.connectHandler}/>
                </div>
                </div>


            </div>
            
        }

        return(
            <div>
                <NewConnectionModal />
                {msgAlert}
                {body}
            </div>
        )
    }

}


export default DettaglioDevice;
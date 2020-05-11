import React, { Component } from 'react';
import Connessioni from './Connessioni/connessioni';
import NewConnectionModal from '../Modals/NewConnectionModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import {Card, Row, Col} from 'react-bootstrap';
import './dettaglio_device.css';
import axios from 'axios';



class DettaglioDevice extends Component {

    state = {
        DettaglioDevice : null,
        messages : [],
        availableConnections : [],
        modalNewConnectionOn : false,
        iFace_Selected: null,
        force_reoad:false,
        nuoveConnessioni : [],
        connectionsType : [],
        statoIcone : 1
    }

    componentDidMount() {
        this.getDevices();
        this.getConnectionType();

    }

    componentDidUpdate(){
        this.componentDidMount();
    }


    getDevices = () =>{
        if(this.props.Device_Id){
            if ( !this.state.DettaglioDevice || (this.state.DettaglioDevice && this.state.DettaglioDevice.Device_Id !== this.props.Device_Id) || this.state.force_reoad){
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

    getConnectionType = () =>{
        if(this.state.connectionsType.length === 0 || this.state.force_reoad ){
            axios.get("http://localhost:3200/hw/connection_type")
            .then( result =>{ 
                console.log(result.data)  
                this.setState({connectionsType : result.data,
                                force_reoad:false})
            })  
            .catch( error =>{
                this.props.addMessages({variant:"warning", header : "Errore server", text:"Errore nel recuperare i dati dal server "+error})
            })               
        }
         
    }    
    
    addConnectionType = (connessioni) =>{
        let conn = connessioni.map( conn => parseInt(conn))
        console.log(conn)
        axios.post("http://localhost:3200/hw/device/"+this.props.Device_Id+"/interfaces",{device : {interfaces : conn}})
        .then( result =>{ 
            console.log(result.data)  
            this.state.messages.push({level:"alert-success", body: "Aggiunte nuove connessioni"})
            this.setState({force_reoad:true})
            this.addNewConnectionDone()
        })   
        .catch( error =>{
            this.props.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile creare la nuova interfaccia "+error})
        })                  
    }
    

    modalHandler = (deviceTarget, interfaceTarget) => {
        console.log(deviceTarget)
        console.log(interfaceTarget)
        console.log("http://localhost:3200/hw/fromDevice/"+this.state.DettaglioDevice.Device_Id+"/interface/"+this.state.iFace_Selected+"/toDevice/"+deviceTarget+"/interfaces/"+interfaceTarget)
        if(deviceTarget == null){
            this.setState({modalNewConnectionOn : false})
            return
        }
        
        axios.post("http://localhost:3200/hw/fromDevice/"+this.state.DettaglioDevice.Device_Id+"/interface/"+this.state.iFace_Selected+"/toDevice/"+deviceTarget+"/interfaces/"+interfaceTarget)
        .then( result =>{ 
            this.state.messages.push({level:"alert-success", body: "Connessione device effettuata."})
            this.setState({modalNewConnectionOn : false, force_reoad:true})
            this.componentDidMount()

        })     
        .catch( error =>{
            this.props.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile creare la nuova connessione "+error})
        })        
    }

    connectHandler = (connTypeId, iFace_id) =>{
        console.log(connTypeId)
        console.log(iFace_id)
        axios.get("http://localhost:3200/hw/device/"+this.props.Device_Id+"/connectin_type/"+connTypeId)
        .then( result =>{ 
            console.log(result.data)  
            this.setState({availableConnections : result.data,
                            modalNewConnectionOn: true,
                            iFace_Selected : iFace_id})
        })
        .catch( error =>{
            this.props.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile recuperare le connessioni disponibili "+error})
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
            this.props.addMessages({variant:"warning", header : "Errore server", text:"Non è stato possibile disconnettere i device "+error})
        })
    }

    addNewConnection = () =>{
        
        let nuoveConnessioni = [...this.state.nuoveConnessioni,{Device_Id:-100, Interface_id:this.state.nuoveConnessioni.length+1 }]
        this.setState({nuoveConnessioni:nuoveConnessioni,
                            newConId:this.state.nuoveConnessioni.length+1})
    }

    addNewConnectionDone = () =>{
        this.setState({nuoveConnessioni:[]})
    }  
    
    flagForDelete = () =>{
        let linkToDel = this.state.DettaglioDevice.deviceConnections.filter( iFace => iFace.Connection_id == null)
        let newDettaglioDevice = this.state.DettaglioDevice;
        newDettaglioDevice.deviceConnections = linkToDel;
        this.setState({
            statoIcone:2,
            DettaglioDevice : newDettaglioDevice
        })
        this.props.addMessages({variant:"info", header : "Cancellazione Interfaccie", text:"Solo le interfaccie non connesse possono essere cancellate, rimuovere la connessione prima di cancellare l'interfaccia"})

    }

    render(){

        let body = <p>Please Select an item</p>;

        if(this.props.Device_Id){
            body = <p>Loading ... </p>
        }

        if(this.state.DettaglioDevice){
            body= 

                <Card>
                    <Card.Header className="card-header">
                        <Row>
                            <Col className="col-sm-9">
                                <h3>{this.state.DettaglioDevice.Nome}</h3>
                            </Col>
                            <Col className="col-sm-3">
                                {this.state.DettaglioDevice.urlAccesso ? <a className="float-right" target="_new" href={this.state.DettaglioDevice.urlAccesso}><FontAwesomeIcon icon={faSignInAlt} size="lg" data-toggle="tooltip" data-placement="bottom" title="Accesss alla console"/></a> : null}
                                <i className="float-right"><FontAwesomeIcon icon={faEdit} size="lg" color="orange" data-toggle="tooltip" data-placement="bottom" title="Edita device"/></i>
                                <i className="float-right"><FontAwesomeIcon icon={faTrashAlt} size="lg" color="red" data-toggle="tooltip" data-placement="bottom" title="Cancella device"/></i>
                            </Col>
                        </Row>
                        
                    </Card.Header>
                    <Card.Body className="card-body">
                        <Row>
                            <Col xs lg="3">
                                <img src={this.state.DettaglioDevice.urlFoto} className="card-img-top" alt={this.state.DettaglioDevice.urlFoto}/>
                            </Col>
                            <Col>
                                <p>{this.state.DettaglioDevice.Descrizione}</p>
                                    <Row>
                                        <Col>
                                            <dl className="row">
                                                <dt className="col-sm-3">Eth.</dt>
                                                <dd className="col-sm-9">{this.state.DettaglioDevice.IPV4_Eth}</dd>      

                                                <dt className="col-sm-3">Site</dt>
                                                <dd className="col-sm-9">{this.state.DettaglioDevice.Site}</dd>                                 
                                            </dl>                    
                                        </Col>           

                                        <Col>
                                            <dl className="row">
                                                <dt className="col-sm-3">WiFi</dt>
                                                <dd className="col-sm-9">{this.state.DettaglioDevice.IPV4_WiFi}</dd>      

                                                <dt className="col-sm-3">Modello</dt>
                                                <dd className="col-sm-9">{this.state.DettaglioDevice.Modello}</dd>                                 
                                            </dl>                    
                                        </Col> 
                                    </Row>             
                            </Col>
                        </Row>

                        <hr/>
                        <Row>
                            <Col>
                                <h5 className="card-title">Connessioni verso altri dispositivi</h5>
                            </Col>
                            <Col>
                                <i className="float-right" onClick={() => this.addNewConnection()}><FontAwesomeIcon icon={faPlus} size="lg" color="green" data-toggle="tooltip" data-placement="bottom" title="Aggiungi connessione"/></i>
                                <i className="float-right" onClick={() => this.flagForDelete()}><FontAwesomeIcon icon={faTrashAlt} size="lg" color="red" data-toggle="tooltip" data-placement="bottom" title="Cancella connessione" /></i>                               
                            </Col>
                        </Row>
                        
                        
                        <Connessioni conn={this.state.DettaglioDevice.deviceConnections}
                                        deviceNavHandler = {this.props.deviceSelectedHandler}
                                        disconnectHandler ={this.disconnectHandler}
                                        connectHandler = {this.connectHandler}
                                        nuoveConnessioni = {this.state.nuoveConnessioni}
                                        addNewConnectionDone={this.addNewConnectionDone}
                                        connectionsType ={this.state.connectionsType } 
                                        addConnectionType = {this.addConnectionType}
                                        statoIcone={this.state.statoIcone} />
                    </Card.Body>
                </Card>

        }

        return(
            <div>
                
                <NewConnectionModal show={this.state.modalNewConnectionOn} 
                                    modalHandler={this.modalHandler}
                                    availableDevices={this.state.availableConnections} />
                {body}
                
            </div>
        )
    }

}


export default DettaglioDevice;
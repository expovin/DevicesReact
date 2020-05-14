import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import {Row, Col  } from 'react-bootstrap';
import Connessioni from './connessioni';

class InterfaccieDevice extends Component {

    componentDidMount() {
        this.setStatoIcone();

    }    

    setStatoIcone = () =>{

        let snippet = null;
        switch (this.state.statoIcone) {

            case 1:  
                    snippet = 
                    <Col>
                        <i className="float-right" onClick={() => this.props.addNewConnection()}><FontAwesomeIcon icon={faPlus} size="lg" color="blue" data-toggle="tooltip" data-placement="bottom" title="Aggiungi connessione"/></i>
                        <i className="float-right" onClick={() => this.props.flagForDelete()}><FontAwesomeIcon icon={faTrashAlt} size="lg" color="red" data-toggle="tooltip" data-placement="bottom" title="Cancella connessione" /></i>                               
                    </Col>;
                    break;
            case 2: snippet = 
                    <Col>
                        <i className="float-right" onClick={() => { this.setState({statoIcone : 1, force_reoad: true}); this.props.getDevices();}}><FontAwesomeIcon icon={faCheckCircle} size="lg" color="green" data-toggle="tooltip" data-placement="bottom" title="Fatto"/></i>
                    </Col>;
                    break;

        }
        return snippet;
    }


    render(){
        let body = <div>
                    <hr/>
                    <Row>
                        <Col>
                            <h5 className="card-title">Connessioni verso altri dispositivi</h5>
                        </Col>
                        {this.setStatoIcone()}
                    </Row>
                    
                    
                    <Connessioni conn={this.props.deviceConnections}
                                    deviceNavHandler = {this.props.deviceSelectedHandler}
                                    disconnectHandler ={this.props.disconnectHandler}
                                    connectHandler = {this.props.connectHandler}
                                    nuoveConnessioni = {this.props.nuoveConnessioni}
                                    addNewConnectionDone={this.props.addNewConnectionDone}
                                    connectionsType ={this.props.connectionsType } 
                                    addConnectionType = {this.props.addConnectionType}
                                    deleteInterface = {this.props.deleteInterface}
                                    statoIcone={this.props.statoIcone} />       
                    </div>
                        
        return ({body})
    }


}

export default InterfaccieDevice
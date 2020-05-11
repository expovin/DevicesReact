import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faExternalLinkAlt, faUnlink, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import {Button, Form, Table } from 'react-bootstrap';

class ConnessioniDevice extends Component {

    state = {
        TipoConnessione : [],
        statoIcone : 1
    }

    componentDidMount(){
        console.log("[ComponentDidMount]")
    }
    
    componentDidUpdate() {
        console.log("componentDidUpdate");
        if(this.props.statoIcone != this.state.statoIcone){
            console.log("[componentDidUpdate] --> Cambio stato")
            this.setState({statoIcone:this.props.statoIcone});
        }       
        this.render();
    }    

    handleChangeTipoConn = (event) =>{
        console.log(event.target.name +":"+event.target.value);
        let connessioni = [...this.state.TipoConnessione];
        connessioni[parseInt(event.target.name)-1] = event.target.value;
        console.log(connessioni);
        this.setState({TipoConnessione: connessioni})
    }

    options = () =>{
        if(this.props.connectionsType)
        return (
            [{Descrizione : "Seleziona tipo connessione"},...this.props.connectionsType].map((connType,idx) => <option key={idx} value={connType.Connection_Type_Id}>{connType.Descrizione}</option>)
        )
    }

    select = (idx) =>{
        return(
            <Form.Group key={idx} controlId="connForm.connType">                
                <Form.Control as="select" onChange={this.handleChangeTipoConn} placeholder="Tipo Connessione" name={idx}>
                    {this.options()}
                </Form.Control>
            </Form.Group>  
        )
    }

    setStatoIcone = (con) =>{

        let snippet=null;

        switch (this.state.statoIcone) {

            case 1:  
                    if(con.Connection_id){
                      snippet = <td>
                                    <div>
                                        <i className="float-right" onClick={() => this.props.deviceNavHandler(con.Device_Id,false)}><FontAwesomeIcon icon={faExternalLinkAlt} size="lg" color="blue" data-toggle="tooltip" data-placement="left" title={"Apri "+con.deviceName}/></i> 
                                        <i className="float-right"onClick={() => this.props.disconnectHandler(con.Connection_id)} ><FontAwesomeIcon icon={faUnlink} size="lg" color="orange" data-toggle="tooltip" data-placement="left" title={"Disconnetti "+con.deviceName}/></i> 
                                    </div>
                                </td>
                            }
                    else
                        snippet = <td><i className="float-right" onClick={() => this.props.connectHandler(con.Connection_type_id, con.Interface_id)}><FontAwesomeIcon icon={faPlug} size="lg" color="green" data-toggle="tooltip" data-placement="left" title="Connetti"/></i></td>
                    break;
            case 2 : snippet =  <td>
                                    <i className="float-right" onClick={() => this.props.disconnectHandler(con.Connection_id)} ><FontAwesomeIcon icon={faMinusCircle} size="lg" color="red" data-toggle="tooltip" data-placement="left" title={"Disconnetti "+con.deviceName}/></i>
                                </td>
                                break;
        }
        return snippet
        
    }

    render(){    


            
            

        let table = [...this.props.conn,...this.props.nuoveConnessioni].map( (con,idx) =>{
            return     <tr key={idx}>
                            <th scope="row">{con.Interface_id}</th>
                            <td>{con.Connection_id ? con.deviceName :null}</td>
                            <td>{con.Device_Id > 0 ? con.Connection_type : this.select(con.Interface_id)}</td>
                            {this.setStatoIcone(con)}
                        </tr>
        })

        return(
            <div>
                <Table striped>
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Device Connesso</th>
                        <th scope="col">Tipo Connessione</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </Table>       
                {this.state.TipoConnessione.length > 0 ? <Button variant="success" onClick={() => this.props.addConnectionType(this.state.TipoConnessione)}>Apply</Button>   : null }  
                {this.state.TipoConnessione.length > 0 ? <Button variant="secondary" onClick={() => this.props.addNewConnectionDone()}>Cancella</Button>   : null }  
            </div>
        )

    }
}

export default ConnessioniDevice
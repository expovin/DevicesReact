import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlug, faExternalLinkAlt, faUnlink, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

class ConnessioniDevice extends Component {

    render(){

        let table = this.props.conn.map( (con,idx) =>{
            return     <tr key={idx}>
                            <th scope="row">{con.Interface_id}</th>
                            <td>{con.Connection_id ? con.deviceName : <i onClick={() => this.props.connectHandler(con.Connection_type_id)}><FontAwesomeIcon icon={faPlug} size="lg" color="green" data-toggle="tooltip" data-placement="left" title="Connetti"/></i>}</td>
                            <td onClick={this.props.deviceNavHandler.bind(con.Device_Id)}>{con.Connection_type}</td>
                            <td>{con.Connection_id ? <div><i  className="float-right" onClick={() => this.props.deviceNavHandler(con.Device_Id)}><FontAwesomeIcon icon={faExternalLinkAlt} size="lg" color="blue" data-toggle="tooltip" data-placement="left" title={"Apri "+con.deviceName}/></i> 
                                                     <i  className="float-right"onClick={() => this.props.disconnectHandler(con.Connection_id)} ><FontAwesomeIcon icon={faUnlink} size="lg" color="orange" data-toggle="tooltip" data-placement="left" title={"Disconnetti "+con.deviceName}/></i> </div> : null}</td>
                        </tr>
        })

        return(
            <div>
                <table className="table table-striped ">
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
                </table>                    
            </div>
        )

    }
}

export default ConnessioniDevice
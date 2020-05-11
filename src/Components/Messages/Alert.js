import React, { Component } from 'react';
import {Alert, Button} from 'react-bootstrap';

class AlertMessage extends Component {


    state = {
        message :null
    }

    dismiss = () =>{
        this.props.dismissMessage();
    }


    message = () =>{
        if(this.props.message)
            return  <Alert  variant={this.props.message.variant}>
                        {this.props.message.text}
                    </Alert>  
        else
            return null
    }

    messageDis = () =>{

        if (this.props.message) {
          return (
            <Alert variant={this.props.message.variant} onClose={() => this.dismiss()} dismissible>
              <Alert.Heading>{this.props.message.header}</Alert.Heading>
              <p>
                  {this.props.message.text}
              </p>
            </Alert>
          );
        }    
        else
            return null;
    }

    render(){ 
                
        return(
            this.messageDis()
        )
        
    }

}

export default AlertMessage;

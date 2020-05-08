import React, { Component } from 'react';

class Breadcrumbs extends Component {

    render(){
        let len = this.props.Breadcrumbs.length
        const body= this.props.Breadcrumbs.map( (Breadcrumb, idx) =>{
            if(len === idx +1)
                return <li key={idx} className="active">{Breadcrumb}</li>
            else
                return <li key={idx}><a onClick={this.props.navBreadcrumbsHandler.bind(this,idx)}>{Breadcrumb}</a> <span className="divider">/</span></li>
        })

        return(
            <div>
                <ul className="breadcrumb">
                    {body}
                </ul>                
            </div>
        )
    }

}

export default Breadcrumbs;
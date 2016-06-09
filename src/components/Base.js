/**
 * Created by alexei on 24/05/16.
 */
import React from 'react';
import { Route } from 'react-router';

export default class Base extends React.Component {

    render(){
        return (
            <div id='container'>
                {this.props.children}
            </div>
        )
    }
}
/**
 * Created by alexei on 09/06/16.
 */
import React from 'react';
import MetricChartActions from '../actions/MetricChartActions';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class RangeDropdown extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedValue: ''
        }
    }

    componentDidMount() {
        if (this.state.selectedValue == '') {
            this.setState({selectedValue: 'Last Data'});
            this.setRange(0);
        }

    }

    setRange(delta){
        const nowMs = new Date().getTime();
        let range;
        if (delta === 0)
        {
            range = {
                startDate: 0,
                endDate: nowMs
            };
        }
        else
        {
            range = {
                startDate: (nowMs - delta),
                endDate: nowMs
            };
        }
        MetricChartActions.setRequestDataRange(range);
    }

    handleSelectedValue(selectedValue) {
        let deltaMs = 0;
        switch (selectedValue){
            case 'Last Data':
                this.setState({selectedValue: selectedValue});
                console.log(this.setRange(deltaMs));
                this.setRange(deltaMs);
                break;
            case '1 Hour Ago':
                this.setState({selectedValue: selectedValue});
                deltaMs = 60 * 60 * 1000; // 1 h in 'ms'
                this.setRange(deltaMs);
                break;
            case '12 Hour Ago':
                this.setState({selectedValue: selectedValue});
                deltaMs = 12 * 60 * 60 * 1000; // 12 h in 'ms'
                this.setRange(deltaMs);
                break;
            case 'A Day Ago':
                this.setState({selectedValue: selectedValue});
                deltaMs = 24 * 60 * 60 * 1000; // 24 h in 'ms'
                this.setRange(deltaMs);
                break;
            case 'A Week Ago':
                this.setState({selectedValue: selectedValue});
                deltaMs = 7 * 24 * 60 * 60 * 1000; // week in 'ms'
                this.setRange(deltaMs);
                break;
            case 'A Month Ago':
                deltaMs = 28 * 24 * 60 * 60 * 1000; // month in 'ms'
                this.setState({selectedValue: selectedValue});
                this.setRange(deltaMs);
                break;
        }

    }

    render() {
        const values = ['Last Data', '1 Hour Ago', '12 Hour Ago', 'A Day Ago', 'A Week Ago', 'A Month Ago'];
        var menuItems = values.map((value,key) => {
            return(
            <MenuItem key={key} eventKey={key} onClick={this.handleSelectedValue.bind(this,value)} >{value}</MenuItem>
            )
        });

        return (
            <DropdownButton bsSize="xsmall" title={this.state.selectedValue} id="dropdown-size-extra-small">
                {menuItems}
            </DropdownButton>
        )

    }
}
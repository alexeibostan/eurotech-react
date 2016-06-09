/**
 * Created by alexei on 31/05/16.
 */
import React from "react";
import AuthenticatedComponent from '../AuthenticatedComponent';
import TopicList from '../TopicList';
import MetricList from '../MetricList';
import MetricChart from '../MetricChart';
import AlertCustom from '../AlertCustom';
import {Row, Col, Panel, PageHeader} from "react-bootstrap";

export default AuthenticatedComponent( class Charts extends React.Component {

    constructor(){
        super();
        
    }
        

    

    render(){

     
        return(
            <div>
                <Row>
                    <Col lg={12}>
                        <AlertCustom/>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                        <PageHeader> Charts </PageHeader>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        <Panel header="Topics">
                            <div className="panel-body-custom">
                                <TopicList />
                            </div>
                        </Panel>
                    </Col>
                    <Col lg={6}>
                        <Panel header="Metrics">
                            <div className="panel-body-custom">
                                <MetricList />
                            </div>
                        </Panel>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <MetricChart />
                    </Col>
                </Row>
            </div>
        )
    }

})
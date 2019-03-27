import * as React from 'react';
import InternalNode, { ServiceModel } from './nodes/Node';
import { mdiDatabase, mdiDesktopTower, mdiDocker, mdiMonitorDashboard, mdiNas } from '@mdi/js';
import styled from 'styled-components';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Node = styled(InternalNode)`
    margin: 8px;
`;

function getIcon(node: any) {
    if (node.type === 'docker') {
        return mdiDocker;
    }else if (node.type === 'host') {
        return mdiDesktopTower;
    }
}

export class Dashboard extends React.Component {
    state: {
        nodes: ServiceModel[]
    } = {
        nodes: []
    };

    componentDidMount() {
        this.fetchDashboard()
            .then(nodes => this.setState({ nodes }));
    }

    private async fetchDashboard(): Promise<ServiceModel[]> {
        const res = await fetch('http://localhost:9001/api/services');
        const nodes = await res.json();

        return nodes.map(node => {
            const icon = getIcon(node);
            return {
                title: node.name,
                icon,
                status: node.status
            };
        });
    }

    render() {
        const nodes = this.state.nodes;
        return <DashboardContainer>
            {nodes.map(n => <Node node={n}/>)}
        </DashboardContainer>;
    }
}

const nodes = () => <>
    <Node node={{
        icon: mdiNas,
        status: 1,
        title: 'Data Storage 1',
        metrics: [{
            title: 'Storage',
            type: 'bar',
            value: 0.8
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: 1,
        title: 'Pi Master',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.2
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: 1,
        title: 'Pi Node 1',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.5
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: 0,
        title: 'Pi Node 2'
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: 1,
        title: 'Pi Node 3',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.42
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: 1,
        title: 'Pi Node 4',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.752
        }]
    }}/>
    <Node node={{
        icon: mdiDatabase,
        status: 1,
        title: 'Postgres'
    }}/>
    <Node node={{
        icon: mdiMonitorDashboard,
        status: 1,
        title: 'Grafana'
    }}/>
</>;
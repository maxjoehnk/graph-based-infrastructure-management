import * as React from 'react';
import InternalNode, { ServiceModel } from './nodes/Node';
import { mdiDesktopTower, mdiDocker } from '@mdi/js';
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
        const res = await fetch('http://localhost:9000/api/services');
        const nodes = await res.json();

        const mapNode = node => {
            const icon = getIcon(node);
            const map = node.children.map(mapNode).reduce((a, b) => [...a, ...b], []);
            return [{
                id: node.id,
                title: node.name,
                icon,
                status: node.status
            }, ...map];
        };
        return nodes.map(mapNode).reduce((a, b) => [...a, ...b], []);
    }

    render() {
        const nodes = this.state.nodes;
        return <DashboardContainer>
            {nodes.map(n => <Node node={n} key={n.id}/>)}
        </DashboardContainer>;
    }
}

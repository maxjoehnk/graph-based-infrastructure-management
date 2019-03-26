import * as React from 'react';
import InternalNode, { ServiceStatus } from './nodes/Node';
import { mdiNas, mdiDocker, mdiDatabase, mdiMonitorDashboard } from '@mdi/js';
import styled from 'styled-components';

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Node = styled(InternalNode)`
    margin: 8px;
`;

export const Dashboard = () => <DashboardContainer>
    <Node node={{
        icon: mdiNas,
        status: ServiceStatus.Up,
        title: 'Data Storage 1',
        metrics: [{
            title: 'Storage',
            type: 'bar',
            value: 0.8
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: ServiceStatus.Up,
        title: 'Pi Master',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.2
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: ServiceStatus.Up,
        title: 'Pi Node 1',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.5
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: ServiceStatus.Down,
        title: 'Pi Node 2'
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: ServiceStatus.Up,
        title: 'Pi Node 3',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.42
        }]
    }}/>
    <Node node={{
        icon: mdiDocker,
        status: ServiceStatus.Up,
        title: 'Pi Node 4',
        metrics: [{
            title: 'CPU',
            type: 'bar',
            value: 0.752
        }]
    }}/>
    <Node node={{
        icon: mdiDatabase,
        status: ServiceStatus.Up,
        title: 'Postgres'
    }}/>
    <Node node={{
        icon: mdiMonitorDashboard,
        status: ServiceStatus.Up,
        title: 'Grafana'
    }}/>
</DashboardContainer>;
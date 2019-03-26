import * as React from 'react';
import { ServiceMetric } from './Node';
import styled from 'styled-components';

const Header = styled.h3`
    opacity: 0.54;
    padding-bottom: 4px;
`;

const barRadius = 2;

const BarContainer = styled.div`
    border-radius: ${barRadius}px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    height: 4px;
    width: 100%;
`;

const ActualBar = styled.div`
    border-radius: ${barRadius}px;
    width: ${props => props.value * 100}%;
    height: 100%;
    background: green;
`;

const Bar = ({ value }: { value: number }) => <BarContainer>
    <ActualBar value={value}/>
</BarContainer>;

export interface NodeMetricsProps {
    metrics: ServiceMetric[]
}

const NodeMetrics = ({ metrics }: NodeMetricsProps) => metrics.map((metric, index) => <div key={index}>
    <Header>{metric.title}</Header>
    {metric.type === 'bar' && <Bar value={metric.value}/>}
</div>);

export default NodeMetrics;
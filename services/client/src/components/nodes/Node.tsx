import * as React from 'react';
import { CardHeader, CardTitle, FixedWidthCard } from '../parts/Card';
import { mdiDotsVertical } from '@mdi/js';
import NodeMetrics from './NodeMetrics';
import { IconButton } from '../parts/Button';

export interface ServiceModel {
    id: string;
    title: string;
    icon: string;
    status: any;//ServiceStatus;
    metrics?: ServiceMetric[];
    // children: ServiceModel[];
}

export type ServiceMetric = BarMetric | GraphMetric;

export interface BarMetric {
    type: 'bar';
    title: string;
    value: number;
}

export interface GraphMetric {
    type: 'graph';
    title: string;
    values: number[];
}

export const Node = ({ node, className }: { className?: string, node: ServiceModel }) => <FixedWidthCard
    highlight={node.status === 1 ? 'green' : 'red'} width={300} className={className}>
    <CardHeader>
        <CardTitle>
            <IconButton icon={node.icon}/>
            {node.title}
        </CardTitle>
        <IconButton icon={mdiDotsVertical}/>
    </CardHeader>
    {node.metrics && <NodeMetrics metrics={node.metrics}/>}
</FixedWidthCard>;

export default Node;
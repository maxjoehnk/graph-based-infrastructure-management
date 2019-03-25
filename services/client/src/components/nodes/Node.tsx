import * as React from 'react';
import styled from 'styled-components';
import Card from '../parts/Card';

const CardTitle = styled.h1`
    margin: 0;
`;

const FixedWidthCard = styled(Card)`
    max-width: ${props => props.width}px;
    width: 100%;
`;

export const Node = () => <FixedWidthCard highlight='green' width={300}>
    <CardTitle>Data Storage 1</CardTitle>
</FixedWidthCard>;
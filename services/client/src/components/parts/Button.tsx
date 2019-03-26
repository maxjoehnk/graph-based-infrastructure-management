import * as React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';

export const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
`;

export const IconButton = ({ icon }) => <Button>
    <Icon path={icon} size={1}/>
</Button>;

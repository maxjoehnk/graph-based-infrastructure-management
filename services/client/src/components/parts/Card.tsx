import styled, { css } from 'styled-components';

export const Card = styled.div`
    border-radius: 4px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    border-top: 8px solid white;
    padding: 8px;
    
    ${props => props.highlight && css`
        border-top-color: ${props.highlight}    
    `}
`;

export default Card;

export const CardHeader = styled.h2`
    margin: 0;
    font-size: 24px;
    display: flex;
    flex-direction: row;
`;

export const CardTitle = styled.span`
    flex: 1;
`;

export const FixedWidthCard = styled(Card)`
    max-width: ${props => props.width}px;
    width: 100%;
    background: white;
`;

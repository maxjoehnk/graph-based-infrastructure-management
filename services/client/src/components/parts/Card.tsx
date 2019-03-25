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
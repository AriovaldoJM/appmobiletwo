import styled, { css } from "styled-components/native";

export type FilterStyleProps = {
    isActive?: boolean;
}

export const Container = styled.View<FilterStyleProps>`
    ${({ theme, isActive }) => isActive && css`
        border: 1px solid ${theme.COLORS.GREEN_500};
    `}
    
    border-radius: 4px;
    margin-right: 12px;

    height: 38px;
    width: 70px;

    justify-content: center;    
    align-items: center;
`

export const Title = styled.Text`
    text-transform: uppercase;

    ${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.BOLD};
        font-size: ${theme.FONT_SIZE.SM}px;
        color: ${theme.COLORS.WHITE};
    `}
`
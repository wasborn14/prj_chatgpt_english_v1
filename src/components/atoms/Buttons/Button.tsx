import { Color } from 'src/const'
import styled, { css } from 'styled-components'
import { sp, pc } from 'src/media'

type ButtonProps = {
  select?: boolean
  color?: string
  backgroundColor?: string
  width: number
  height?: 24 | 32 | 36 | 40 | 48
  disabled?: boolean
}

const DisabledStyle = css`
  background: ${Color.DISABLE};
  color: ${Color.WHITE};
  border: none;
  &:hover {
    cursor: not-allowed;
    background: ${Color.DISABLE};
    color: ${Color.WHITE};
  }
`

// const BaseStyle = css<Pick<ButtonProps, "select" | "backgroundColor">>`
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   ${sp`
//     width: 240px;
//     height: 36px;
//   `}
//   ${pc`
//     width: 280px;
//     height: 40px;
//   `}
//   text-decoration: none;
//   font-weight: normal;
//   svg {
//     margin-right: 8px;
//   }
// `;

const BaseStyle = css<Pick<ButtonProps, 'select' | 'backgroundColor' | 'width' | 'height'>>`
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  text-decoration: none;
  font-weight: normal;
  svg {
    margin-right: 8px;
  }
`

const ShortStyle = css<Pick<ButtonProps, 'select' | 'backgroundColor'>>`
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${sp`
    width: 240px;
    height: 36px;
  `}
  ${pc`
    width: 240px;
    height: 40px;
  `}
  text-decoration: none;
  font-weight: normal;
  svg {
    margin-right: 8px;
  }
`

const GeneralStyle = css<Pick<ButtonProps, 'disabled'>>`
  background: ${Color.DARK_BROWN1};
  border: 2px solid ${Color.DARK_BROWN2};
  color: ${Color.WHITE};
  ${({ disabled }) => disabled && DisabledStyle}
`

const GrayStyle = css<Pick<ButtonProps, 'disabled'>>`
  background: ${Color.LIGHT_GRAY};
  border: 2px solid ${Color.TEXT_THIRD};
  color: ${Color.TEXT_SECOND};
  ${({ disabled }) => disabled && DisabledStyle}
`

const SelectStyle = css<Pick<ButtonProps, 'select' | 'disabled'>>`
  color: ${({ select }) => (select ? Color.WHITE : Color.TEXT_SECOND)};
  background: ${({ select }) => (select ? Color.DARK_BROWN1 : Color.LIGHT_GRAY)};
  ${({ disabled }) => disabled && DisabledStyle}
`

const ColorStyle = css<Pick<ButtonProps, 'color' | 'backgroundColor' | 'disabled'>>`
  color: ${({ color }) => `${color}`};
  background: ${({ backgroundColor }) => `${backgroundColor}`};
  ${({ disabled }) => disabled && DisabledStyle}
`

export const GeneralButton = styled.button`
  ${BaseStyle}
  ${GeneralStyle}
`

export const GeneralShortButton = styled.button`
  ${ShortStyle}
  ${GeneralStyle}
`

export const GrayButton = styled.button`
  ${BaseStyle}
  ${GrayStyle}
`

export const SelectButton = styled.button`
  ${BaseStyle}
  ${SelectStyle}
`

export const ColorButton = styled.button`
  ${BaseStyle}
  ${ColorStyle}
`

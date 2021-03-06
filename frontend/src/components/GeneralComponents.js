import { Row, Col, Card } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
    padding: 24px;
    background-color: #e9ebee;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`
export const CenteredRow = styled(Row)`
    width: 100%;
    margin: 12px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const CenteredCol= styled(Col)`
    display: flex;
    justify-content: center;
`
export const ActionsContainer = styled(Col)`
    justify-content: space-between;
    flex-direction: row;
    width: 50%;
`
export const SpaceBetweenRow = styled(Row)`
	margin: 16px 8px 16px 16px;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
`
export const FormCard = styled(Card)`
    background-color: #FEFEFE;
    margin: 24px;
    width: 50%;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.18) !important;
`
export const ErrorMessage = styled.h3`
    color: red;
    font-weight: bold;
`


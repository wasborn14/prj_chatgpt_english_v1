import { Color } from '@/const'
import styled from 'styled-components'

type Props = {
  person: string
  text: string
}

export const Output = ({ person, text }: Props) => {
  return (
    <Container>
      <Person>{person}</Person>
      <DescriptionWrapper>
        <Description>{text}</Description>
      </DescriptionWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 800px;
`

const Person = styled.h3``

const DescriptionWrapper = styled.div`
  padding: 8px;

  border: 1px solid ${Color.GRAY};
  resize: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(#000, 0.075);
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`
const Description = styled.p``

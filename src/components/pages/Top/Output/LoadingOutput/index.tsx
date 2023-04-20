import { ChatLoading } from '@/components/atoms/Loading'
import { Color } from '@/const'
import { sp } from '@/media'
import styled from 'styled-components'

export const LoadingOutput = () => {
  return (
    <Container>
      <Person>chatGPT</Person>
      <DescriptionWrapper>
        <ChatLoading />
      </DescriptionWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 800px;
  ${sp`
    width: 350px;
  `}
`

const Person = styled.h3``

const DescriptionWrapper = styled.div`
  height: 50px;
  padding: 20px;

  border: 1px solid ${Color.GRAY};
  resize: none;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(#000, 0.075);
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`

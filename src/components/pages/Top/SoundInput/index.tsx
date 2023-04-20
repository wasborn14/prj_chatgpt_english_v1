import styled from 'styled-components'
import { GeneralShortButton } from '@/components/atoms/Buttons/Button'

export const SoundInput = () => {
  return (
    <Container>
      <Wrapper>
        <GeneralShortButton type='submit'>音声入力</GeneralShortButton>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 800px;
`

const Wrapper = styled.div`
  margin-top: 20px;
`

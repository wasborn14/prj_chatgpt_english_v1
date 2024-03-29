import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { Schema } from '../schema'
import { GeneralShortButton } from '@/components/atoms/Buttons/Button'
import { TextArea } from '@/components/atoms/Forms/TextArea'
import { sp } from '@/media'

type Props = {
  onClick: () => void
}

export const Input = ({ onClick }: Props) => {
  const { register, handleSubmit } = useFormContext<Schema>()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // cmd + Enter もしくは ctrl + Enter
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      onClick()
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onClick)}>
        <TextArea
          heightPx={200}
          widthPx={500}
          onKeyDown={handleKeyDown}
          {...register('text')}
          placeholder='Please Enter ...'
        />
        <Wrapper>
          <GeneralShortButton type='submit'>Send</GeneralShortButton>
        </Wrapper>
      </form>
    </Container>
  )
}

const Container = styled.div`
  width: 800px;
  ${sp`
    width:350px;
  `}
`

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`

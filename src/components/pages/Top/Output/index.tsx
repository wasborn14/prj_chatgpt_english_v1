import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { sp } from '@/media'
import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'

type Props = {
  role: string
  content: string
}

export const Output = ({ role, content }: Props) => {
  const [chatMessage, setChatMessage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeoutId = setTimeout(() => {
        setChatMessage((prevText) => prevText + content[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, 40)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [content, currentIndex])

  return (
    <Container role={role}>
      <Wrapper>
        <Person>{role === 'user' ? '' : 'ChatGPT'}</Person>
        <DescriptionWrapper>
          <DesignWrapper>
            <Description>{role === 'user' ? content || '' : chatMessage || ''}</Description>
          </DesignWrapper>
        </DescriptionWrapper>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div<{ role: string }>`
  width: 1000px;
  ${sp`
    width:350px;
  `}
  display: flex;
  ${({ role }) =>
    role === 'user'
      ? css`
          justify-content: end;
        `
      : css`
          justify-content: start;
        `}
`

const Wrapper = styled.div`
  width: 700px;
  ${sp`
    width:300px;
  `}
`

const Person = styled.h3``

const DescriptionWrapper = styled.div`
  margin-top: 8px;
  background-color: ${Color.WHITE};

  border: 2px solid ${Color.GRAY};
  border-radius: 8px;
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.45);

  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`

const DesignWrapper = styled.div`
  border: 4px solid ${Color.BACKGROUND_COLOR1};
  padding: 10px;
  background-color: ${Color.BACKGROUND_COLOR1};
`

const Description = styled.p`
  ${fontStyles['20px']}
`

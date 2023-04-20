import React from 'react'
import styled, { keyframes } from 'styled-components'

export const ChatLoading = () => {
  return (
    <Container>
      <Loading />
    </Container>
  )
}

const dotFlashing = keyframes`
  0% {
    background-color: black;
  }
  100% {
    background-color: white;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
`

const Loading = styled.div`
  position: relative;

  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: white;

  animation: ${dotFlashing} 1s infinite linear alternate;
  animation-delay: 0.5s;
  animation: ${dotFlashing} 0.9s infinite linear alternate;
  animation-delay: 0.3s;

  ::before,
  ::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  ::before {
    left: 16px;

    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: white;
    color: $color;

    animation: ${dotFlashing} 1s infinite alternate;
    animation-delay: 1s;
    animation: ${dotFlashing} 0.9s infinite alternate;
    animation-delay: 0.6s;
  }

  ::after {
    left: 32px;

    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: white;
    color: $color;

    animation: ${dotFlashing} 1s infinite alternate;
    animation-delay: 1.5s;
    animation: ${dotFlashing} 0.9s infinite alternate;
    animation-delay: 0.9s;
  }
`

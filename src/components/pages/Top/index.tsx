import React, { useEffect, useState } from 'react'
import { Input } from './Input'
import styled from 'styled-components'
import { Schema } from './schema'
import { FormProvider, useForm } from 'react-hook-form'
import { Output } from './Output'
import { Spacer } from '@/components/atoms/Spacer'
import { GeneralShortButton } from '@/components/atoms/Buttons/Button'
import { Message, requestOpenApi } from '@/hooks/api'
import { LoadingOutput } from './Output/LoadingOutput'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export type FormProps = Schema & {}

// const SYSTEM_CONTENT =
//   'Can I have a conversation with you so that I can improve my English? ' +
//   'Please point out my English mistakes and correct them as a native English speaker would say them. You start this conversation.'
// const SYSTEM_CONTENT =
//   'You are an English teacher.' +
//   'Please point out my English mistakes and correct them as a native English speaker would say them.'

const FIRST_CONTENTS: Message[] = [
  { role: 'user', content: 'Can I have a conversation with you so that I can improve my English?' },
  {
    role: 'assistant',
    content:
      "Certainly! I'd be happy to chat with you and help you improve your English. What would you like to talk about?"
  },
  {
    role: 'user',
    content:
      'Please point out my English mistakes and correct them as a native English speaker would say them. You start this conversation.'
  },
  {
    role: 'assistant',
    content:
      'Sure, I can do that. Please feel free to start a conversation on any topic and I will provide corrections as needed.'
  }
]

export const Top = () => {
  const [isSoundOutput, setIsSoundOutput] = useState(true)
  const [chats, setChats] = useState<Message[]>([
    ...FIRST_CONTENTS

    // { role: 'system', content: 'あなたはみんなに愛されるゆるキャラです。必ずタメ口で話すようにしてください。' }
    // {
    //   role: 'system',
    //   content: 'あなたは英会話の講師です。英語で日常会話の練習をするのと同時に解説を行なってください'
    // }
  ])
  const [isChatLoading, setIsChatLoading] = useState(false)

  const defaultValues: FormProps = {
    text: ''
  }

  const methods = useForm<FormProps>({
    defaultValues: defaultValues
  })

  const callAI = async () => {
    SpeechRecognition.stopListening()
    resetTranscript()

    const newChat: Message = { role: 'user', content: methods.getValues('text') }
    methods.setValue('text', '')
    setChats((prev) => [...prev, newChat])

    setIsChatLoading(true)
    const res = await requestOpenApi([...chats, newChat])
    setIsChatLoading(false)

    setChats((prev) => [...prev, res as Message])

    // setDataList([...dataList, { person: 'User', text: chat }, { person: 'ChatGPT', text: '...' }])

    // const res = await axios.get('/api/chatgpt?chat=' + chat)
    // const data = await res.data
    // setDataList([...dataList, { person: 'User', text: chat }, { person: 'ChatGPT', text: data.chat }])

    // 音声出力
    if (isSoundOutput) {
      const synthesis = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(res?.content)
      const voices = await synthesis.getVoices()
      // const englishVoice = voices.find((voice) => voice.name === 'Google UK English Female')
      const englishVoice = voices.find((voice) => voice.name === 'Google US English')
      if (englishVoice) {
        utterance.voice = englishVoice
      }
      synthesis.cancel()
      synthesis.speak(utterance)
    }
    // alert(data.chat)
  }

  const handleClickSoundOutput = () => {
    if (isSoundOutput) {
      const synthesis = window.speechSynthesis
      synthesis.cancel()
    }
    setIsSoundOutput(!isSoundOutput)
  }

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    console.log({ transcript })
    methods.setValue('text', transcript)
  }, [transcript, methods])

  return (
    <Container>
      <FormProvider {...methods}>
        {/* {chats.slice(1, chats.length).map((chat, index) => ( */}
        {chats.slice(4, chats.length).map((chat, index) => (
          <OutputWrapper key={`text_${index}`}>
            <Output role={chat.role} content={chat.content} />
          </OutputWrapper>
        ))}

        <Spacer y={20} />
        {isChatLoading && <LoadingOutput />}

        <Spacer y={20} />
        <Input onClick={callAI} />
        <Spacer y={20} />
        <GeneralShortButton onClick={() => SpeechRecognition.startListening({ continuous: true })}>
          Start
        </GeneralShortButton>
        <Spacer y={20} />
        <GeneralShortButton onClick={resetTranscript}>Reset</GeneralShortButton>
        <Spacer y={20} />
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <Spacer y={20} />
        <GeneralShortButton onClick={() => SpeechRecognition.stopListening()}>Stop</GeneralShortButton>
        <Spacer y={20} />
        <GeneralShortButton onClick={handleClickSoundOutput}>
          {isSoundOutput ? 'sound:off' : 'sound:on'}
        </GeneralShortButton>
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 200px;
`

const OutputWrapper = styled.div`
  margin-top: 20px;
`

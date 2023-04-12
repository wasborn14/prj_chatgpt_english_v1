import React, { useState } from 'react'
import axios from 'axios'
import { Input } from './Input'
import styled from 'styled-components'
import { Schema } from './schema'
import { FormProvider, useForm } from 'react-hook-form'
import { Output } from './Output'
import { Spacer } from '@/components/atoms/Spacer'

export type FormProps = Schema & {}

type TextData = {
  person: string
  text: string
}

const demoText = [
  {
    person: 'User',
    text: 'test'
  },
  {
    person: 'User',
    text: 'test'
  }
]

export const Top = () => {
  const [dataList, setDataList] = useState<TextData[]>([])

  const defaultValues: FormProps = {
    text: ''
  }

  const methods = useForm<FormProps>({
    defaultValues: defaultValues
  })

  const callAI = async () => {
    // const chat: string = (document!.getElementById('text-textbox') as HTMLInputElement).value
    const chat: string = methods.getValues('text')
    setDataList([...dataList, { person: 'User', text: chat }, { person: 'ChatGPT', text: '...' }])

    const res = await axios.get('/api/chatgpt?chat=' + chat)
    const data = await res.data
    console.log(data)
    console.log(data.chat)
    setDataList([...dataList, { person: 'User', text: chat }, { person: 'ChatGPT', text: data.chat }])
    // alert(data.chat)
  }

  return (
    <Container>
      <FormProvider {...methods}>
        {dataList.map((data, index) => (
          <OutputWrapper key={`text_${index}`}>
            <Output person={data.person} text={data.text} />
          </OutputWrapper>
        ))}
        <Spacer y={20} />
        <Input onClick={callAI} />
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

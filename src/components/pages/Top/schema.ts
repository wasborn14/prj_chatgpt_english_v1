import { ERROR_LIMIT_WORDS_10000 } from 'src/const/errorMessages'
import * as yup from 'yup'

export const schema = yup.object({
  text: yup.string().max(10000, ERROR_LIMIT_WORDS_10000).required('テキストを入力してください')
})

export type Schema = yup.InferType<typeof schema>

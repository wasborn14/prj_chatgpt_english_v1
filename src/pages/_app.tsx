import type { AppProps } from 'next/app'
import { GlobalStyles } from 'src/global-styles'
import 'regenerator-runtime/runtime'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

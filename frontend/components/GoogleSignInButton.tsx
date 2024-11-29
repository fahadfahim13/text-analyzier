'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from './ui/button'
import Image from 'next/image'


const GoogleSignInButton = (props: {type: string}) => {
    const {type} = props;
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? ''

  return (
    <Button
      className='w-full'
      onClick={() => {
        if(type.toLocaleLowerCase() === 'google'){
            signIn('google', { callbackUrl })
        }
        if(type.toLocaleLowerCase() === 'github'){
            signIn('github', { callbackUrl })
        }
      }}
    >
      {type.toLocaleLowerCase() === 'google' ?<Image src={'/icons8-google.svg'} alt='google' width={20} height={20} />
      : <Image src={'/icons8-github.svg'} alt='github' width={20} height={20} />} {"  "}
      Continue with {type.toLocaleLowerCase() === 'google' ? 'Google' : 'GitHub'}
    </Button>
  )
}

export default GoogleSignInButton
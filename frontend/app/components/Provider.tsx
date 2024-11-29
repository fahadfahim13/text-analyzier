'use client';
 
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

const Provider = (props: {children: ReactNode}) => {
    const {children} = props;
 
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    )
}

export default Provider
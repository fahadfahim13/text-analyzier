'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

const ReduxProvider = (props: {children: ReactNode}) => {
    const {children} = props;
 
    return (
      <Provider store={store}>
        {children}
      </Provider>
    )
}

export default ReduxProvider
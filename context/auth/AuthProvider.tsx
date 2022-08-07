import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FC, useEffect, useReducer } from 'react';
import { testloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
 isLoggedIn: boolean;
 user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
 isLoggedIn: false,
 user: undefined
}

export const AuthProvider:FC<any> = ({children}) => {

 const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
 const router = useRouter()

 useEffect(() => {
  checkToken()
 }, [])

 const checkToken = async() => {

  if(!Cookies.get('token')) {
    return
  }

  try {
    const {data} = await testloApi.get('/user/validate-token')
    const {token, user } = data
    Cookies.set('token', token)
    dispatch({type: '[Auth] - Login', payload: user})
  } catch (error) {
    Cookies.remove('token')
  }
 }

 const loginUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const {data} = await testloApi.post('/user/login', {email, password})
    const {token, user } = data
    Cookies.set('token', token)
    dispatch({type: '[Auth] - Login', payload: user})
    return true
  } catch (error) {
    return false
  }
 }

 const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean; message?: string}> => {
  try {
    const {data} = await testloApi.post('/user/register', {name, email, password})
    const {token, user } = data
    Cookies.set('token', token)
    dispatch({type: '[Auth] - Login', payload: user})
    return {
      hasError:  false,
    }
  } catch (error) {
    if(axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error.response as any
      }
    }
    return {
      hasError: true,
      message: 'No se pudo crear el usuario'
    }
  }
 }

 const logout = () => {
  Cookies.remove('token')
  Cookies.remove('cart')
  router.reload()
 }

 return (
  <AuthContext.Provider value={{
   ...state,
    loginUser,
    registerUser,
    logout
  }}>
   {children}
  </AuthContext.Provider>
 )
}
import { configureStore } from '@reduxjs/toolkit'
import LinkShortnerSlice from '../features/Common/CommonSlice'
import PlaceHolder from '../features/Common/PlaceHolder'
import  PasswordSlice  from '../features/LinkEncrypter/PasswordSlice'
import FeatureSlice from '../features/Feature/FeatureSlice'
export const store = configureStore({
    reducer: {
      input : LinkShortnerSlice,
      placeholder : PlaceHolder,
      password : PasswordSlice,
      feature : FeatureSlice
    },
  })

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


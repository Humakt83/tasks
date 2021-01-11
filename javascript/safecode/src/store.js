import { createSlice, configureStore } from '@reduxjs/toolkit';

export const CORRECT_CODE = '1234';

const keySlice = createSlice({
  name: 'key',
  initialState: {
    locked: true,
    numbers: '',
  },
  reducers: {
    addNumber: (state, action) => {      
      const number = action.payload;
      state.numbers += number;
      if (state.numbers.length >= 4) {        
        state.locked = state.numbers !== CORRECT_CODE;
        state.numbers = '';
      } else {
        state.locked = true;
      }
      console.log(state.locked);
    }
  }
})

export const store = configureStore({
  reducer: keySlice.reducer
})

export const { addNumber } = keySlice.actions;

export const locked = state => state.locked;
export const numbers = state => state.numbers;

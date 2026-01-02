import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PasswordState {
    value: string;
}

const initialState: PasswordState = {
    value: "",
};

export const PasswordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {
        updatePassword: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { updatePassword } = PasswordSlice.actions;

export default PasswordSlice.reducer; 
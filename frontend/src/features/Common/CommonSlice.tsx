import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
    value: string;
}

const initialState: CommonState = {
    value: "",
};

export const CommonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        updateOriginalLink: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { updateOriginalLink } = CommonSlice.actions;

export default CommonSlice.reducer; 
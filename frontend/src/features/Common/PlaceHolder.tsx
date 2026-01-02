import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaceholderState {
    value: string;
}

const initialState: PlaceholderState = {
    value: "Enter the above fields and click the below button.",
};

export const PlaceHolder = createSlice({
    name: "placeholder",
    initialState,
    reducers: {
        updatePlaceholder: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { updatePlaceholder } = PlaceHolder.actions;

export default PlaceHolder.reducer; 
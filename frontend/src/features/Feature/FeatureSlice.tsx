import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeatureState {
    value: number;
}

const initialState: FeatureState = {
    value: 1,
};

export const FeatureSlice = createSlice({
    name: "feature",
    initialState,
    reducers: {
        updateFeature: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        },
    },
});

export const { updateFeature } = FeatureSlice.actions;

export default FeatureSlice.reducer; 
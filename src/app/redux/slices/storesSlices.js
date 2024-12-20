import { createSlice } from '@reduxjs/toolkit';

const preStores = [
    {
        code: "001",
        description: "Store 1",
        code_location: "LOC001",
        detail_location: "Detail 1",
        state: "State 1",
        manager: "Manager 1"
    },
    {
        code: "002",
        description: "Store 2",
        code_location: "LOC002",
        detail_location: "Detail 2",
        state: "State 2",
        manager: "Manager 2"
    },
    {
        code: "003",
        description: "Store 3",
        code_location: "LOC003",
        detail_location: "Detail 3",
        state: "State 3",
        manager: "Manager 3"
    },
    {
        code: "004",
        description: "Store 4",
        code_location: "LOC004",
        detail_location: "Detail 4",
        state: "State 4",
        manager: "Manager 4"
    },
    {
        code: "005",
        description: "Store 5",
        code_location: "LOC005",
        detail_location: "Detail 5",
        state: "State 5",
        manager: "Manager 5"
    },
    {
        code: "006",
        description: "Store 6",
        code_location: "LOC006",
        detail_location: "Detail 6",
        state: "State 6",
        manager: "Manager 6"
    }
]

const storesSlice = createSlice({
    name: 'stores',
    initialState: preStores,
    reducers: {
        addStore: (state, action) => {
            state.push(action.payload);
        },
        deleteStore: (state, action) => {
            const index = state.findIndex(store => store.code === action.payload.code);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        updateStore: (state, action) => {
            const index = state.findIndex(store => store.code === action.payload.code);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
    },
});

export const { addStore, deleteStore, updateStore } = storesSlice.actions;

export default storesSlice.reducer;

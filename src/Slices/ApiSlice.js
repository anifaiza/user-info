import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    hasErrors: false,
    data: [],
    searchedData: [],
    filteredData: [],
}

export const fetchData = createAsyncThunk("api/fechData", async () => {
    // let data;
    const response = await fetch("https://randomuser.me/api/?results=50"
    )
    const data = await response.json()
    return data.results
})

export const apiSlice = createSlice({
    name: "UserData",
    initialState,
    reducers: {
        searchByName: (state, action) => {
            if (action.payload !== "") {
                state.searchedData = state.data.filter(item => (item.name.last.toLowerCase().includes(action.payload)
                    || item.name.first.toLowerCase().includes(action.payload)
                    || item.email.toLowerCase().includes(action.payload)
                    || item.login.username.toLowerCase().includes(action.payload)))
            }
        },
        filterData: (state, { payload }) => {
            if (payload === 'all') {
                state.searchedData = state.data
            } else if (payload === 'male') {
                state.searchedData = state.data.filter(i => i.gender === 'male')
            } else if (payload === 'female') {
                state.searchedData = state.data.filter(i => i.gender === 'female')
            }
        },
        filterSearchedData: (state, { payload }) => {
            if (payload === 'all') {
                state.filteredData = state.searchedData
            } else if (payload === 'male') {
                state.filteredData = state.searchedData.filter(i => i.gender === 'male')
            } else if (payload === 'female') {
                state.filteredData = state.searchedData.filter(i => i.gender === 'female')
            }
        },
    },
    extraReducers: {
        [fetchData.pending]: state => {
            state.loading = true
        },
        [fetchData.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        [fetchData.rejected]: state => {
            state.loading = false
            state.hasErrors = true
        },
    },
})

export const dataSelector = state => state.data

export const {
    searchByName,
    filterData,
    filterSearchedData
} = apiSlice.actions

export default apiSlice.reducer
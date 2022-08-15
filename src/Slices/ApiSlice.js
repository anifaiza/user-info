import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    hasErrors: false,
    data: [],
    searchedData: [],
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
    searchByName: (state, { payload }) => {
      if (payload !== "") {
        // state.searchedData = state.data.filter()
      }
    }
    },
    extraReducers: {
        [fetchData.pending]: state => {
          state.loading = true
        },
        [fetchData.fulfilled]: (state,  {payload} ) => {
          state.loading = false
          state.data = state.data.concat(payload)
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
  } = apiSlice.actions
  
  export default apiSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    hasErrors: false,
    data: [],
    searchedData: [],
  }

  export const fetchData = createAsyncThunk("api/fechData", async () => {
    const response = await fetch("https://randomuser.me/api/")
    const data = await response.json()
    return data
  })

  export const apiSlice = createSlice({
    name: "sapcexData",
  initialState,
  reducers: {
    searchByName: (state, { payload }) => {
      if (payload !== "") {
        state.searchedData = state.data.filter(i =>
          i.rocket.rocket_name.toLowerCase().includes(payload)
        )
      }
    }
    }
  })

  export const dataSelector = state => state.data

  export const {
    searchByName,
  } = apiSlice.actions
  
  export default apiSlice.reducer
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";



export const fetchStocks = createAsyncThunk("stocks/fetchStocks", async () => {
  const response = await api.get("/api/stocks");
  return response.data;
});

export const fetchStockData = createAsyncThunk("stocks/fetchStockData", async ({ stockId, duration }) => {
  const response = await api.post(`/api/stocks/${stockId}`, { duration });
  return response.data;
});

const stockSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    stockData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.stocks = action.payload;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockData.fulfilled, (state, action) => {
        state.loading = false;
        state.stockData = action.payload;
      })
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default stockSlice.reducer;

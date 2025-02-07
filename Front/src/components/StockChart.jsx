import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks, fetchStockData } from "../store/stockSlice";
import { MenuItem, Select, FormControl, InputLabel, Container, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";


Chart.register(...registerables);


Chart.register(...registerables);

const StockChart = () => {
  const dispatch = useDispatch();
  const { stocks, stockData, loading } = useSelector((state) => state.stocks);
  const [selectedStock, setSelectedStock] = useState("");
  const [duration, setDuration] = useState("1d");

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  useEffect(() => {
    if (selectedStock) {
      const interval = setInterval(() => {
        dispatch(fetchStockData({ stockId: selectedStock, duration }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [selectedStock, duration, dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Stock Market Dashboard</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Stock</InputLabel>
        <Select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
          {stocks.map((stock) => (
            <MenuItem key={stock.id} value={stock.id}>{stock.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Duration</InputLabel>
        <Select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <MenuItem value="1d">1 Day</MenuItem>
          <MenuItem value="1w">1 Week</MenuItem>
          <MenuItem value="1m">1 Month</MenuItem>
        </Select>
      </FormControl>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Line
          data={{
            labels: stockData.map((point) => new Date(point.timestamp).toLocaleTimeString()),
            datasets: [
              {
                label: "Stock Price",
                data: stockData.map((point) => point.price),
                borderColor: "#3e95cd",
                fill: false,
              },
            ],
          }}
        />
      )}
    </Container>
  );
};

export default StockChart;

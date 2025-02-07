
import { Provider } from "react-redux";
import store from "./store/store";
import StockChart from "./components/StockChart";
import { Container } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Container>
        <StockChart />
      </Container>
    </Provider>
  );
}

export default App;

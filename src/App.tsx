import React from "react";
import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import TrackShipment from "./pages/TrackShipment";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackShipment />
    </QueryClientProvider>
  );
}

export default App;

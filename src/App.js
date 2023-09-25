import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Home />
    </QueryClientProvider>
  );
}

export default App;

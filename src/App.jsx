import MovieForm from "./components/MovieForm";
import Movies from "./components/Movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Movies />
        
      </div>
    </QueryClientProvider>
  );
};

export default App;

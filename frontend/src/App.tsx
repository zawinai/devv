// Elements
import Header from "./components/header";
import Footer from "./components/footer";
import Layout from "./components/layout";

// Axios
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getData } from "./api/data";

function App() {
  const queryClient = useQueryClient();

  const getDataMutation = useMutation(getData, {
    onSuccess: () => {
      queryClient.invalidateQueries("auth");
    },
  });

  return (
    <main>
      <Header />
      <Layout />
      <Footer />
    </main>
  );
}

export default App;

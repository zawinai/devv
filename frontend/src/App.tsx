// Elements
import Header from "./components/header";
import Hero from "./components/hero";
import Footer from "./components/footer";
import Layout from "./components/layout";

// Axios
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getData } from "./api/post";

function App() {
  // const queryClient = useQueryClient();

  // const getDataMutation = useMutation(getData, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("auth");
  //   },
  // });

  return (
    <main className='max-w-[2000px] mx-auto'>
      {/* <Hero /> */}
      <Header />
      <Layout />
      <Footer />
    </main>
  );
}

export default App;

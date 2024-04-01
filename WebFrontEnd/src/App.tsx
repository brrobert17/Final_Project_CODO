import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import "./style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import Product from "./pages/Product";
import Products from "./pages/Products";
import ImageSlider from 'components/ImageSlider';
import ScrollTopBtn from 'components/ScrollTopBtn';
import {ReactQueryDevtools} from "react-query/devtools";
import Search from 'pages/Search';

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/product/*' element={<Product />} />
                    <Route path='/products/:id' element={<Products />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import "./style.css";
import {QueryClient, QueryClientProvider} from "react-query";
import Product from "./pages/Product";
import Products from "./pages/Products";

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/product' element={<Product/>}/>
                    <Route path='/products/*' element={<Products/>}/>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;

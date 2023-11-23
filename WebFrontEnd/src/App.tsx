import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import "./style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ImageSlider from 'components/ImageSlider';
import ScrollTopBtn from 'components/ScrollTopBtn';

const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/image-slider' element={<><div style={{ width: '40vw', height: '10vw' }}><ImageSlider onClick={(img) => console.log(img)} /></div><ScrollTopBtn /></>} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;

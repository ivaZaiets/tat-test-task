import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home/Home";
import Tour from "./pages/Tour/Tour";
import NotFound from "./pages/NotFound/NotFound";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tours/:priceId/:hotelId" element={<Tour />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Root;

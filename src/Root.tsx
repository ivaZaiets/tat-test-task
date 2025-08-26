import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default Root;

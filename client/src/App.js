import Aos from "aos";
import "aos/dist/aos.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";

import Navigation from "./navigations/index";

const App = () => {
  Aos.init();

  return <Navigation />;
};

export default App;

import styles from "scss/App.module.scss";
import "scss/reset.scss";
import "scss/global.scss";
import { useState } from "react";
import AppRouter from "components/Router";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
    </>
  );
}

export default App;

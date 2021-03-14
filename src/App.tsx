import { useAuthContext } from "./contexts/AuthContext";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./common/Loading";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

export default function App() {
  const { user, init } = useAuthContext();

  return init ? (
    <Loading init />
  ) : (
    <Router>
      <Switch>
        <Route path="/" exact>
          {!user ? <Auth /> : <Home />}
        </Route>
      </Switch>
    </Router>
  );
}

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./pages/Coins/Coins";
import Coin from "./pages/Coin/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;

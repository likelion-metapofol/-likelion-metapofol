import React from "react";
import './App.css';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import { HashRouter as Router, Route, Switch, BrowserRouter, Redirect, Routes, } from 'react-router-dom';

import event from './components/views/main/event'
import detail from './components/views/detail/detail'
import Header from './components/Header';

import MetaPofolMainView from './pages/MetaPofolMainView';
import MetaPofolMarketView from './pages/MarketPofolMarketView';
import MetaPofolCertificate from './pages/MetaPofolCertificate';
import MetaPofolWallet from './pages/MetaPofolWallet';
import MetaPofoMinting from './pages/MetaPofolMintingView';
import MetaPofolMintingComplete from './pages/MetaPofolMintingCompleteView';

export default function App() {
  return (
    // <Router>
    //   <div>
    //     {/*
    //       A <Switch> looks through all its children <Route>
    //       elements and renders the first one whose path
    //       matches the current URL. Use a <Switch> any time
    //       you have multiple routes, but you want only one
    //       of them to render at a time
    //     */}
    //     <Switch>
    //       <Route exact path="/" component={event}/>
    //       <Route exact path="/detail" component={detail}/>
    //     </Switch>
    //   </div>
    // </Router>
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<MetaPofolMainView />} exact={true} />
          <Route path="/metapofolmarket" element={<MetaPofolMarketView />} />
          <Route path="/metapofolcerti" element={<MetaPofolCertificate />} />
          <Route path="/metapofolwallet" element={<MetaPofolWallet />} />
          <Route path="/metapofolminting" element={<MetaPofoMinting />} />
          <Route path="/metapofolmintingcomplete" element={<MetaPofolMintingComplete />} />
          <Route path="/detail" element={<detail />} />
        </Routes>
   </BrowserRouter>
  );
}

// export default App;
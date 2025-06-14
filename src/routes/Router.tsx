import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Url } from './Routes';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/Layout';
import { HomePage, LoginPage, NotFound404, Dashboard, Settings, Account, Preferences, ChangePassword, PendingBet, VoidBet, RefundBet, SettledBet, UndeclaredResult,
   ReviewResult, DeclaredResult } from '../pages/wrapperPage';

const RouterContent: React.FC = () => {
  const location = useLocation();
  const isPublicPage = [Url.Login, Url.HomePage].includes(location.pathname);

  return isPublicPage ? (
    <Routes>
      <Route path={Url.HomePage} element={<HomePage />} />
      <Route path={Url.Login} element={<LoginPage />} />
      <Route path={Url.NotFound} element={<NotFound404 />} />
    </Routes>
  ) : (
    <Layout>
      <Routes>
        <Route path={Url.HomePage} element={<HomePage />} />
        <Route path={Url.Login} element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={Url.Dashboard} element={<Dashboard />} />
          <Route path={Url.ChangePassword} element={<ChangePassword />} />
          <Route path={Url.PendingBet} element={<PendingBet />} />
          <Route path={Url.VoidBet} element={<VoidBet />} />
          <Route path={Url.RefundBet} element={<RefundBet />} />
          <Route path={Url.SettledBet} element={<SettledBet />} />
          <Route path={Url.UndeclaredResult} element={<UndeclaredResult />} />
          <Route path={Url.ReviewResult} element={<ReviewResult />} />
          <Route path={Url.DeclaredResult} element={<DeclaredResult />} />
          <Route path={Url.Settings} element={<Settings />}>
            <Route path={Url.Account} element={<Account />} />
            <Route path={Url.Preferences} element={<Preferences />} />
          </Route>
        </Route>
        <Route path={Url.NotFound} element={<NotFound404 />} />
      </Routes>
    </Layout>
  );
};

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

export default Router;
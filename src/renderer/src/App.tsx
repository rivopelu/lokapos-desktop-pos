import { Route, Routes } from 'react-router-dom';
import { BasePage } from './components/BasePage';
import { routeList } from './routes/route-list';
import { ToastContainer } from 'react-toastify';
import { MainLoading } from '@renderer/components/MainLoading';

export default function App() {
  return (
    <div className="bg-slate-100 min-h-screen relative">
      <MainLoading />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {routeList.map((item, i) => {
          const Element = item.elements;
          return (
            <Route
              key={i}
              path={item.route}
              element={
                <BasePage type={item.type}>
                  <Element />
                </BasePage>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

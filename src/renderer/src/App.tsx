import { Route, Routes } from 'react-router-dom';
import { BasePage } from './components/BasePage';
import { routeList } from './routes/route-list';

export default function App() {
  return (
    <div className="bg-slate-100">
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

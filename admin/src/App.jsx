// // import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// // import { privateRoutes, publicRoutes } from "./routes/Routes";
// // import Header from "./Layout/Header";
// // import Aside from "./Layout/Aside";
// // import ProtectedRoute from "./helper/ProtectedRoute"; // Import Protected Route

// // function AppContent() {
// //   const location = useLocation();
// //   const isLoginPage = location.pathname === "/";

// //   return (
// //     <>
// //       {!isLoginPage && <Header />} {/* Hide Header on login page */}

// //       <Routes>
// //         {/* Public Routes */}
// //         {publicRoutes.map((route, index) => (
// //           <Route key={index} path={route.path} element={route.element} />
// //         ))}

// //         {/* Private Routes (Wrapped in Protected Route) */}
// //         <Route element={<ProtectedRoute />}>
// //           {privateRoutes.map((route, index) => (
// //             <Route key={index} path={route.path} element={route.element} />
// //           ))}
// //         </Route>

// //         {/* Catch-All Route for 404 */}
// //         {/* <Route path="*" element={<NotFound />} /> */}
// //       </Routes>

// //       {!isLoginPage && <Aside />} {/* Hide Sidebar on login page */}
// //     </>
// //   );
// // }

// // // Main App Component
// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <AppContent />
// //     </BrowserRouter>
// //   );
// // }

// // export default App;

// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { privateRoutes, publicRoutes } from "./routes/Routes";
// import Header from "./Layout/Header";
// import Aside from "./Layout/Aside";
// import ProtectedRoute from "./helper/ProtectedRoute"; // Import Enhanced Protected Route
// import PermissionDeniedAlert from "./helper/PermissionDeniedAlert";

// function AppContent() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/";

//   return (
//     <>
//       {!isLoginPage && <Header />} {/* Hide Header on login page */}
//       {!isLoginPage && <Aside />} {/* Hide Sidebar on login page */}

//       {/* Permission Denied Alert will show when needed */}
//       {/* <PermissionDeniedAlert /> */}

//         <Routes>
//           {/* Public Routes */}
//           {publicRoutes.map((route, index) => (
//             <Route key={index} path={route.path} element={route.element} />
//           ))}

//           {/* Private Routes (Wrapped in Enhanced Protected Route) */}
//           <Route element={<ProtectedRoute />}>
//             {privateRoutes.map((route, index) => (
//               <Route key={index} path={route.path} element={route.element} />
//             ))}
//           </Route>

//           {/* Catch-All Route for 404 */}
//           <Route path="*" element={<div className="flex items-center justify-center h-screen">
//             <div className="text-center">
//               <h1 className="text-6xl font-bold text-gray-800">404</h1>
//               <p className="text-xl mt-4">Page not found</p>
//             </div>
//           </div>} />
//         </Routes>
//     </>
//   );
// }

// // Main App Component
// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/Routes";
import ProtectedRoute from "./helper/ProtectedRoute";
import Layout from "./Layout/Layout";
import { useEffect } from "react";

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("Admintoken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log(payload)
        if (payload.exp && Date.now() >= payload.exp * 1000) {
          localStorage.removeItem("Admintoken");
        }
      } catch (e) {
        // Invalid token, remove it
        localStorage.removeItem("Admintoken");
      }
    }
  }, []);

  return (
    <>
      {isLoginPage ? (
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      ) : (
        <Layout>
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}

            {/* Private Routes */}
            <Route element={<ProtectedRoute />}>
              {privateRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Route>

            {/* Catch-All Route for 404 */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800">404</h1>
                    <p className="text-xl mt-4">Page not found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PostDetails from "./pages/PostDetails"
import CreatePost from "./pages/CreatePost"
import EditPost from "./pages/EditPost"
import Profile from "./pages/Profile"
import { UserContextProvider } from "./context/UserContext"
import MyPosts from "./pages/MyPosts"
import NotFound from "./pages/NotFound"
import { useEffect, useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { userAuth } from "./AuthCheck"


const App = () => {
  const [user, setUser] = useState([], () => {
    const localData = localStorage.getItem('id');
    return localData ? localData : [];
});
  const ProtectedRoute = ({ user,children }) => {
  if (user==null) {
   return <Navigate to="/login" replace />;
    }
  return children;
  };
  return (
      <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/write" element={
          <ProtectedRoute user={user}>
            <CreatePost user={user} />
          </ProtectedRoute>
        }/>
        <Route exact path="/posts/post/:id" element={
          <ProtectedRoute user={user}>
          <PostDetails user={user} />
        </ProtectedRoute>
        }/>
        <Route exact path="/edit/:id" element={
          <ProtectedRoute user={user}>
          <EditPost user={user} />
        </ProtectedRoute>
        }/>
        <Route exact path="/myposts/:id" element={
          <ProtectedRoute user={user}>
          <MyPosts user={user} />
        </ProtectedRoute>
        }/>
        <Route exact path="/profile/:id" element={
          <ProtectedRoute user={user}>
          <Profile user={user} />
        </ProtectedRoute>
        }/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      </UserContextProvider>
  )
}

export default App
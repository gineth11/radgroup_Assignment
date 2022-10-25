import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import {Home} from "./pages/Home.jsx";
import {SignUp} from "./pages/SignUp.jsx";
import {PostDisplay} from "./pages/PostDisplay.jsx";
import {CreatePost} from "./pages/CreatePost";
import {LogIn} from "./pages/LogIn";
import {AdminPage} from "./pages/AdminPage";
import {EditSeller} from "./pages/EditSeller";
import {SellerPage} from "./pages/SellerPage";
import {EditPost} from "./pages/EditPost.jsx";
import {IsLoggedIn} from "./Script/Auth.jsx";
import {UserProfile} from "./pages/UserProfile.jsx";

function App() {
  const [count, setCount] = useState(0)
    console.log(count)
    useEffect(()=>{
        if(window.location.pathname==='/login' || window.location.pathname==='/sign-up'){
            if(IsLoggedIn()){
                window.location.href='/'
            }
        }else{
            if(!IsLoggedIn()){
                window.location.href='/login'
            }
        }
    },[])

  return (
      <div>

    <div className="App d-flex justify-content-center align-items-center">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/seller" element={<SellerPage/>}/>
            <Route path="/detail" element={<PostDisplay/>}/>
            <Route path="/edit-seller" element={<EditSeller/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/edit-account" element={<UserProfile/>}/>
            <Route path="/edit-post" element={<EditPost/>}/>
            <Route exact path="*" element={<Home/>}/>
        </Routes>

    </div>
      </div>
  )
}

export default App

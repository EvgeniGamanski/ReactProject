const NavBar = () => {
    return (
        <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-gray-100">
          <h1 className="text-lg md:text-xl font-extrabold"><Link to="/"><p>Auto Forum</p></Link></h1>
          {path==="/" && <div className="flex justify-center items-center space-x-0">
  
          </div>}
          <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
              {user? <h3><Link to="/write">Write</Link></h3> : <h3><Link to="/login">Login</Link></h3>}
              {user? <div onClick={showMenu}>
                <p className="cursor-pointer relative"><FaBars/></p>
                {menu && <Menu/>} 
                </div>: <h3><Link to="/register">Register</Link></h3>}
          </div>
          <div onClick={showMenu} className="md:hidden text-lg">
          <p className="cursor-pointer relative"><FaBars/></p>
          {menu && <Menu/>} 
          </div>
  
        </div>
      )
    }
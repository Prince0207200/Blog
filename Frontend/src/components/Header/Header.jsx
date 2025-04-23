import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  console.log("userData", userData);
  
  
  const navigate = useNavigate();
  const location = useLocation(); 

  const navItems = [
    { name: 'Home', slug: "/home", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className=' bg-black'>
      <Container>
        <nav className='flex items-center'>
          <ul className='flex space-x-6 '>
            {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 font-semibold py-2 text-custom-yellow duration-200 
                      ${location.pathname === item.slug ? ' text-white' : ' hover:text-white'}`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

          </ul>

          <div className='mr-4 ml-auto'>
        {userData && userData.data ? (
         <>
         <div className='flex justify-center gap-5 items-center'>
         <p className='text-lg font-semibold pt-2 text-custom-yellow'>Welcome, {userData.data.username}</p>
         <img className='w-10 h-10 border rounded-full' src={userData.data.profileImage} alt="" />

         {/* Logout Button */}
         {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
         </div>
        </>
      ) : (
        <p className='text-lg font-semibold text-custom-yellow'>Welcome, Guest</p>
      )}

        </div>

        </nav>
      </Container>
    </header>
  );
}

export default Header;

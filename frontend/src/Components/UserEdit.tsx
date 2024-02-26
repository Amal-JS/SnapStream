
import '../App.css';
import { SideNav } from './SideNav';



 const UserEditContent = () => {
  return (
    <>
      <div className="w-screen p-10 h-screen bg-black md:pl-52 mb-5 ">
  <h2 className='text-white'>edit profile</h2>
  
      </div>
    </>
  );
};


export  const UserEdit = ()=> {
  return (
    <SideNav>
      <UserEditContent/>
    </SideNav>
  )
}
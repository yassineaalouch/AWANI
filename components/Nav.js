import Link from "next/link";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import { CgWebsite } from "react-icons/cg";
import axios from "axios";
import { IoColorPaletteOutline } from "react-icons/io5";
import { FaArrowTrendDown } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { FaArrowLeft ,FaArrowRight} from "react-icons/fa";



export default function Nav({extendNavBarFunction}){

    const inactiveLink = 'flex justify-between gap-2 p-1';
    const activeLink = inactiveLink+' bg-white text-slate-700 rounded-l-lg p-1';
    const inactiveLinkBurger = 'flex justify-between text-white/50 hover:text-white/80 hover:border-l-[10px]  gap-1 p-1';
    const activeLinkBurger = inactiveLink+' bg-white/30 text-white rounded-l-lg ';


    const router = useRouter();
    const {pathname} = router;
    const [emailsList ,setEmailsList]= useState([])
    const [menuIsShow,setMenuIsShow]=useState(false)

    useEffect(() => {  
        getEmails() 
    },[pathname]);

    function showMenu(){
        setMenuIsShow(!menuIsShow)
    }
    

    async function getEmails(){
        await axios.get('/api/usersEmailsHandler',{ headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY_PROTECTION}`, // Envoyer l'API Key
          }}).then(result=>{
            const list =result.data
            setEmailsList(list.reverse())
        });
        
    }
    const emailsToRead = emailsList.filter(email => !email.isChecked).length;
    const [translate,setTranslate] = useState(false)
    function translateNavBar(){
        setTranslate(!translate)
    }
 

    return(
        <>
        
        <aside className={`text-white w-60 hidden lg:block p-4 pt-0 r-0`}>  
        
        <div className={`fixed -left-[12%] hover:left-0 group pl-2 transition-all h-screen duration-500 py-2 bg-slate-700`}>
            
            <nav className="hidden lg:flex relative flex-col gap-1">
               
                <div className={`centreAbsolute absolute duration-300 transition-all group-hover:left-[100%] top-[50%] left-[100%]`}>
                    <button  onMouseMove={()=>translateNavBar()} className="bg-white border-slate-400 border size-8 rounded-full flex justify-center items-center">
                        <FaArrowLeft size={20} className={`text-slate-700 transition-all group-hover:-rotate-0 duration-300 rotate-180`} />
                    </button>
                </div>

<hr className="w-40 opacity-0"/>
                <Link className={pathname === '/dashbordAdmine' ? activeLink : inactiveLink}  href={'/dashbordAdmine'}>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Dashboard 
                    </div>
                </Link>
                
                <Link className={pathname.includes('/Orders') ? activeLink : inactiveLink}  href={'/Orders'}>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                        </svg>
                        Orders 
                    </div>
                </Link>
<hr className="w-36 my-3"/>
                <Link className={(pathname.includes('/Products')||pathname.includes('/products/new'))? activeLink : inactiveLink}  href={'/Products'}>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                        Products 
                    </div>
                </Link>

                <Link className={pathname.includes('/discounts') ? activeLink: inactiveLink}  href={'/discounts'}>
                    <div className="flex gap-1 items-center">
                        <FaArrowTrendDown  size={25} />
                        Discounts
                    </div>
                </Link>

                <Link className={pathname.includes('/Categories') ? activeLink: inactiveLink}  href={'/Categories'}>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                        Categories
                    </div>
                </Link>

                <Link className={pathname.includes('/properties') ? activeLink: inactiveLink}  href={'/properties'}>
                    <div className="flex gap-1 items-center">
                        <IoColorPaletteOutline size={25} />
                        Properties
                    </div>
                </Link>

                

<hr className="w-36 my-3"/>

                <Link className={pathname.includes('/Emails') ? activeLink : inactiveLink}  href={'/Emails/Send'}>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                        Emails 
                    </div>
                    {emailsToRead!=0 &&<div className="mr-6 h-5 w-5 bg-red-500 rounded-full flex justify-center items-center text-sm  font-bold text-white"></div>}
                </Link>

                <Link className={pathname.includes('/Black_List')? activeLink : inactiveLink}  href={'/Black_List'}>
                    <div className="flex gap-1 items-center">
                        <ImBlocked size={25} />
                        Black list 
                    </div>
                </Link>
<hr className="w-36 my-3"/>
                <Link className={pathname.includes('/Admine')? activeLink : inactiveLink}  href={'/Admine'}>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                        </svg>
                        Admins 
                    </div>
                </Link>

                <Link className={pathname.includes('/Setting') ? activeLink : inactiveLink}  href={'/Settings/home'}>
                    <div className="flex gap-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Settings
                    </div>
                </Link>
                <Link className={inactiveLink}  href={'/'}>
                    <div className="flex gap-1 items-center">
                        <CgWebsite size={25}/>
                        Website
                    </div>
                </Link>
                <hr className="w-40 opacity-0"/>
            </nav>

        </div>
        </aside>




        <div className="absolute left-0 z-30 top-[0] h-12 lg:hidden">
                    <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white bg-black rounded-md font-bold cursor-pointer absolute left-5 z-30 top-3 size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    {menuIsShow &&
                        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2.4px] bg-black/70">
                            <div className=" absolute left-5 z-30 top-3">
                                <svg onClick={showMenu} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white cursor-pointer hover:size-[1.6rem] transition-all font-bold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <ul className="flex flex-col gap-2 justify-center items-center text-white  w-full py-6 bg-white/15 backdrop-blur-[2px]">
                                <div className="w-2/3 border py-1 rounded-md space-y-1 md:space-y-2">
                                    <Link className={pathname === '/dashbordAdmine' ? activeLinkBurger : inactiveLinkBurger}  href={'/dashbordAdmine'}>
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                            Dashboard 
                                        </div>
                                    </Link>
                                    
                                    <Link className={pathname.includes('/Admine')? activeLinkBurger : inactiveLinkBurger}  href={'/Admine'}>
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                            </svg>
                                            Admins 
                                        </div>
                                    </Link>

                                    <Link className={pathname.includes('/Black_List')? activeLinkBurger : inactiveLinkBurger}  href={'/Black_List'}>
                                        <div className="flex gap-1 items-center">
                                            <ImBlocked size={25} />
                                            Black list 
                                        </div>
                                    </Link>

                                    <Link className={pathname.includes('/Products')? activeLinkBurger : inactiveLinkBurger}  href={'/Products'}>
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                            </svg>
                                            Products 
                                        </div>
                                    </Link>

                                    <Link className={pathname.includes('/Categories') ? activeLinkBurger : inactiveLinkBurger}  href={'/Categories'}>
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                            </svg>
                                            Categories
                                        </div>
                                    </Link>

                                    <Link className={pathname.includes('/properties') ? activeLinkBurger: inactiveLinkBurger}  href={'/properties'}>
                                        <div className="flex gap-1 items-center">
                                            <IoColorPaletteOutline size={25} />
                                            Properties
                                        </div>
                                    </Link>

                                    <Link className={pathname.includes('/discounts') ? activeLinkBurger: inactiveLinkBurger}  href={'/discounts'}>
                                        <div className="flex gap-1 items-center">
                                            <FaArrowTrendDown  size={25} />
                                            Discounts
                                        </div>
                                    </Link>
                                    
                                    <Link className={pathname.includes('/Orders') ? activeLinkBurger : inactiveLinkBurger}  href={'/Orders'}>
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                            </svg>
                                            Orders 
                                        </div>
                                    </Link>

                                    <Link className={pathname.includes('/Emails') ? activeLinkBurger : inactiveLinkBurger}  href={'/Emails/Send'}>
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                            </svg>
                                            Emails 
                                        </div>
                                        {emailsToRead!=0 &&<div className="mr-6 h-5 w-28 lg:w-5 bg-red-500 rounded-full flex justify-center items-center text-sm  font-bold text-white"></div>}
                                    </Link>

                                    <Link className={pathname.includes('/Setting') ? activeLinkBurger : inactiveLinkBurger}  href={'/Settings/home'}>
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            </svg>
                                            Settings
                                        </div>
                                    </Link>
                                    <Link className={inactiveLinkBurger}  href={'/'}>
                                        <div className="flex gap-1 items-center">
                                            <CgWebsite size={25}/>
                                            Website
                                        </div>
                                    </Link>
                                </div>
                            </ul>
                        </div>
                    }
                </div>
        </>
    );
}

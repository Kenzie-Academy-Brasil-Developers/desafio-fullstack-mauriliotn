import { ToastContainer } from "react-toastify";
import SessionPage from "./login/page";



export default async function Home() {

  return (
    <>
    <SessionPage/>
    <ToastContainer theme="dark" autoClose={1500}/>
    </>
  );
}

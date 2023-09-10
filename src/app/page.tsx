import FooterNav from "./components/FooterNav";
import Widget from "./components/Widget";
import Sidebar from "./components/Sidebar";
import Topnav from "./components/Topnav";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <>
      <main className=" text-white w-full h-screen flex font-blink relative top-0 ">
        {/* Mobile navigation */}
        <Topnav />
        {/*  */}
        <Sidebar />
        <div className="flex flex-1  sm:px-0 w-full sm:w-[88%] md:w-[78%] xl:w-[80%] relative top-0 h-full">
          <Feed />
          <Widget />
        </div>
      </main>
      <FooterNav />
    </>
  );
}

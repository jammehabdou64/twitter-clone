import { MdMoreHoriz, MdOutlineSearch } from "react-icons/md";

const Widget = () => {
  const TrendingOptions = ({ title, numsOfPost }: any) => {
    return (
      <div className="mb-5 ">
        <div className="flex justify-between ">
          <p className="text-sm text-gray-500">Trending</p>
          <MdMoreHoriz />
        </div>
        <h3 className="text-[15.5px]">#{title}</h3>
        <p className="text-xs text-gray-500">{numsOfPost} posts</p>
      </div>
    );
  };

  return (
    <div className="lg:w-[39%]  lg:block hidden  left-0  px-4 h-screen">
      <div className="w-full  mt-2">
        <div className="search-container rounded-full flex bg-dark items-center w-full p-2">
          <MdOutlineSearch size={27} className="text-gray-700 gap-3" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="bg-inherit outline-none flex-1 px-2"
          />
        </div>
        <div className="subscribe bg-dark py-4 px-4 mt-4 rounded-2xl h-fit">
          <h2
            className="font-bold text-xl
          "
          >
            Subscribe to Premium
          </h2>
          <p className="text-[15px] leading-5 font-semibold my-2">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <div className="mt-1">
            <button className="bg-primary text-white py-2 px-3 font-bold text-[15px] rounded-full">
              Subscribe
            </button>
          </div>
        </div>

        <div className="trendings h-fit bg-dark rounded-2xl mt-5 py-3 px-5">
          <h2 className="font-bold text-xl mb-8">Trends for you</h2>
          <TrendingOptions title={"Software Developer"} numsOfPost={"2,344"} />
          <TrendingOptions title={"Islam"} numsOfPost={"2,004"} />
          <TrendingOptions title={"Nodejs"} numsOfPost={"2,300"} />
          <TrendingOptions title={"React"} numsOfPost={"2,000"} />
          <TrendingOptions title={"Python"} numsOfPost={"2,500"} />
          <TrendingOptions title={"C#"} numsOfPost={"1,344"} />
        </div>
      </div>
    </div>
  );
};

export default Widget;

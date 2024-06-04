import { useCallback, useEffect, useState } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import { navItems } from "./data";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getData } from "./utils";
import Spinner from "./components/Spinner";
import NewsFeed from "./components/NewsFeed";
import BreakingNews from "./components/BreakingNews";



function App() {
  const [selected, setSelected] = useState(navItems[0]);
  const [searchText, setSearchText] = useState("");
  const [latest, setLatest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  

  // const handleScroll = useCallback(() => {
  //   const mainView = document.getElementById("mainView");
  //   if (
  //     window.innerHeight + window.scrollY < mainView.offsetHeight ||
  //     isLoading
  //   ) {
  //     return;
  //   }
  //   getFeed()
  //   console.log("End of screen");
  //   //fetchData();
  // }, [selected, page]);



  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isLoading]);

  //Everything
  //https://newsapi.org/v2/everything?q=${selected}&apiKey=${
  //     import.meta.env.VITE_API_KEY
  //   }
  //Search
  //https://newsapi.org/v2/everything?q=${searchText}&apiKey=a9b6d743b1d7418f850dcbf169a72e29
  //Headlines
  //https://newsapi.org/v2/top-headlines?country=us&category=${selected}&apiKey=a9b6d743b1d7418f850dcbf169a72e29

  


  const getBreakingNews = useCallback(async () => {
    if (!isLoading) {
      setIsLoading(true);
    }
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${selected.breaking_slug}&apiKey=${
      import.meta.env.VITE_API_KEY
    }&pageSize=25&page=1`;
    const data = await getData(url);
    if (data) {
      const articles = data?.articles;
      if (articles) {
        const filtered = articles.filter((item) => item.urlToImage !== null);
        setLatest(filtered);
      }
    }
    setIsLoading(false);
  },[selected])
  useEffect(() => {
    getBreakingNews();  
  }, [selected]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isFeedLoading]);

  return  (
    <div className="flex">
      <SideNav selected={selected} setSelected={setSelected} />

      <div className="bg-slate-900 flex-1 overflow-x-hidden xl:overflow-hidden flex flex-col">
        <div className="fixed min-w-[86%] bg-slate-900 z-30 ">
          <Header
            searchText={searchText}
            setSearchText={setSearchText}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

      {isLoading ? (
    <div className="min-h-screen bg-slate-900 flex-1 flex items-center justify-center">
      <Spinner />
    </div>
  ) :  <div id="mainView" className="flex-1 mt-36 xl:mt-24">
          <BreakingNews latest={latest} />
          <div className="h-6 xl:h-10 " />
          <div className="flex-1 relative">
            <div className="flex flex-col xl:flex-row xl:space-x-10 justify-between">
              <NewsFeed selected={selected}/>
              <Footer />
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default App;

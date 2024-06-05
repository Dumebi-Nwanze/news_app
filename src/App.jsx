import "./App.css";
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Spinner from "./components/Spinner";
import NewsFeed from "./components/NewsFeed";
import BreakingNews from "./components/BreakingNews";
import { useAppState } from "./context/globalStates";
import NewsDetails from "./components/NewsDetails";
import SearchResults from "./components/SearchResults";

function App() {
  const { isLoading, showSearchResults, searchText, isError } = useAppState();

  return (
    <div>
      <NewsDetails />
      <div className="flex">
        <SideNav />

        <div className="bg-slate-900 flex-1 overflow-x-hidden xl:overflow-hidden flex flex-col">
          <div className="fixed min-w-[86%] bg-slate-900 z-30 ">
            <Header />
          </div>

          {isLoading ? (
            <div className="min-h-screen bg-slate-900 flex-1 flex items-center justify-center">
              <Spinner />
            </div>
          ) : showSearchResults || searchText.length > 3 ? (
            <SearchResults />
          ) : isError ? (
            <div className="h-screen flex items-center justify-center text-xs md:text-base px-4 text-center">
              <p>Something went wrong, data could not load. Try again later</p>
            </div>
          ) : (
            <div className="flex-1 mt-36 xl:mt-24">
              <BreakingNews />
              <div className="h-6 xl:h-10 " />
              <div className="flex-1 relative">
                <div className="flex flex-col md:flex-row md:space-x-10">
                  <NewsFeed />
                  <Footer />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

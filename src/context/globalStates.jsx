import { createContext, useContext, useState, useRef, useEffect } from "react";
import { getData } from "../utils";
import { navItems } from "../data";

const AppContext = createContext();

import React from "react";

function AppProvider({ children }) {
  //Global state variables
  const [selectedArticle, setSelectedArticle] = useState();
  const [selected, setSelected] = useState(navItems[0]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [latest, setLatest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const searchRef1 = useRef(); //ref to small screen search input
  const searchRef2 = useRef(); //ref to large screen search input
  const searchResultsRef = useRef(); //reference to the search Results component

  //Functions

  const handleInput = (e) => {
    // handle the changes in the input fields,
    setSearchText(e.target.value);
    if (e.target.value === "") {
      // if the input is cleared, reset search related variables
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const getBreakingNews = async () => {
    //get the top headlines for a particular category
    if (!isLoading) {
      setIsLoading(true);
    }
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      selected.breaking_slug
    }&apiKey=${import.meta.env.VITE_API_KEY}&pageSize=25&page=1`;
    const data = await getData(url);
    if (data) {
      const articles = data?.articles;
      if (articles) {
        const filtered = articles.filter((item) => item.urlToImage !== null); // filter damaged data
        setLatest(filtered);
      }
    }else{// if initial data didnt load assume there is a problem with the api key limit
        setIsError(true)
    }
    setIsLoading(false);
  };

  const getSearchQuery = async () => {
    //function to search for queries in search input
    if (searchText.length > 3) {
      // wait till something substanstial is inputed
      if (!isLoading) {
        setIsLoading(true);
      }
      const url = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${
        import.meta.env.VITE_API_KEY
      }&pageSize=30&page=1`;
      const data = await getData(url);
      if (data) {
        const articles = data?.articles;
        if (articles) {
          const filtered = articles.filter((item) => item.urlToImage !== null); // filter damaged data
          setSearchResults(filtered);
        }
      }
      setIsLoading(false);
    }
  };

  //Effects

  useEffect(() => {
    getBreakingNews(); //get the breaking news on first render
  }, [selected]); // refectch as the selected nav categort changes

  useEffect(() => {
    getSearchQuery(); //search for news
  }, [searchText]); //refetch based on the searchtext value which is passed to both input fields

  //This is responsible for showing the Search results component based on the interaction with the search inputs
  useEffect(() => {
    const handleFocus = () => {
      if (showSearchResults === true) {
        // no need to change if its alread true, in case of double taps
        return;
      }
      setShowSearchResults(true);
    };
    const handleBlur = (event) => {
      if (
        // chack if what is tapped is in the search results component area
        searchResultsRef.current &&
        searchResultsRef.current.contains(event.relatedTarget)
      ) {
        return;
      }
      if (searchResults.length > 0) {
        // check if there is some search results
        return;
      }
      setShowSearchResults(false);
    };

    const searchElement1 = searchRef1.current;
    const searchElement2 = searchRef2.current;
    //add event listeners to listen to blur and focus events on both inputs
    if (searchElement1) {
      searchElement1.addEventListener("focus", handleFocus);
      searchElement1.addEventListener("blur", handleBlur);
    }

    if (searchElement2) {
      searchElement2.addEventListener("focus", handleFocus);
      searchElement2.addEventListener("blur", handleBlur);
    }
    //cleanup event listeners
    return () => {
      if (searchElement1) {
        searchElement1.removeEventListener("focus", handleFocus);
        searchElement1.removeEventListener("blur", handleBlur);
      }
      if (searchElement2) {
        searchElement2.removeEventListener("focus", handleFocus);
        searchElement2.removeEventListener("blur", handleBlur);
      }
    };
  }, [showSearchResults, searchResults]);

  return (
    <AppContext.Provider
      value={{
        selectedArticle,
        setSelectedArticle,
        showSearchResults,
        setShowSearchResults,
        searchResults,
        setSearchResults,
        searchText,
        setSearchText,
        selected,
        setSelected,
        latest,
        setLatest,
        isLoading,
        setIsLoading,
        handleInput,
        isError,
        setIsError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export const useAppState = () => useContext(AppContext); //hook to make accessing state easier

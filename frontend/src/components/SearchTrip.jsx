import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const SearchTrip = ({ setFilters }) => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromSuggestionsVisible, setFromSuggestionsVisible] = useState(true);
  const [toSuggestionsVisible, setToSuggestionsVisible] = useState(true);

  const debouncedSearch = debounce(async (input, setSuggestions) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/state_districts?query=${input}`
      );
      const suggestions = response.data.map((district) => district.district);
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  }, 300); 

  const handleInputChange = (
    inputValue,
    setSuggestions,
    setSuggestionsVisible
  ) => {
    setSuggestions([]);
    setSuggestionsVisible(true);
    if (inputValue.trim() !== "") {
      debouncedSearch(inputValue, setSuggestions);
    }
  };

  const handleSuggestionClick = (
    suggestion,
    setInput,
    setSuggestions,
    setSuggestionsVisible
  ) => {
    setInput(suggestion);
    setSuggestions([]);
    setSuggestionsVisible(false);
  };

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, from, to }));
    navigate("/trips");
  };

  return (
    <div className="border max-w-fit h-[60px] my-5 rounded-lg flex justify-between items-center p-10 shadow-lg bg-white gap-10 relative">
      <input
        type="text"
        className="border w-[200px] h-[45px] pl-2 rounded-md outline-none"
        placeholder="Where from?"
        value={from}
        onChange={(e) => {
          setFrom(e.target.value);
          handleInputChange(
            e.target.value,
            setFromSuggestions,
            setFromSuggestionsVisible
          );
        }}
        onBlur={() => setFromSuggestionsVisible(false)}
      />
      {fromSuggestionsVisible && fromSuggestions.length > 0 && (
        <div className="absolute top-[70px] flex flex-col gap-3 border bg-white w-[200px] p-5 max-h-[250px] overflow-scroll rounded-md">
          {fromSuggestions.map((suggestion, index) => (
            <span
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSuggestionClick(
                  suggestion,
                  setFrom,
                  setFromSuggestions,
                  setFromSuggestionsVisible
                );
              }}
              className="cursor-pointer"
            >
              {suggestion}
            </span>
          ))}
        </div>
      )}
      <FaArrowRight className="text-blue-500 text-[20px]" />
      <input
        type="text"
        className="border w-[200px] h-[45px] pl-2 rounded-md outline-none"
        placeholder="Where to?"
        value={to}
        onChange={(e) => {
          setTo(e.target.value);
          handleInputChange(
            e.target.value,
            setToSuggestions,
            setToSuggestionsVisible
          );
        }}
        onBlur={() => setToSuggestionsVisible(false)}
      />
      {toSuggestionsVisible && toSuggestions.length > 0 && (
        <div className="absolute top-[70px] left-[340px] flex flex-col gap-3 border bg-white w-[200px] p-5 h-[250px] overflow-scroll rounded-md">
          {toSuggestions.map((suggestion, index) => (
            <span
              key={index}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSuggestionClick(
                  suggestion,
                  setTo,
                  setToSuggestions,
                  setToSuggestionsVisible
                );
              }}
              className="cursor-pointer"
            >
              {suggestion}
            </span>
          ))}
        </div>
      )}
      <div className="border flex h-[45px] items-center gap-2 pl-2 rounded-md w-[150px]">
        <SlCalender className="text-[25px]" />
        <input
          type="text"
          className="h-full w-full outline-none"
          placeholder="22/11/2023"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="border p-2 bg-blue-500 rounded-lg ">
        <BsSearch className=" text-[25px] text-white cursor-pointer" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default SearchTrip;

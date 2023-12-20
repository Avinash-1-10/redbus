import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { BsSearch, BsCalendar } from "react-icons/bs";
import axios from "axios";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { editFilter } from "../redux/actionCreators/filter";

const SearchTrip = ({ setFilters }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromSuggestionsVisible, setFromSuggestionsVisible] = useState(true);
  const [toSuggestionsVisible, setToSuggestionsVisible] = useState(true);
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    setDate(todayFormatted);
  }, []);

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
    let filter = { from, to, date };
    console.log(filter);
    dispatch(editFilter(filter));
    navigate("/trips");
  };

  const handleCalendarChange = (selectedDate) => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate);
    setCalendarVisible(false);
  };

  return (
    <div className="border max-w-fit h-auto md:h-[60px] my-5 rounded-lg flex flex-col md:flex-row justify-between items-center p-5 md:p-10 shadow-lg bg-white gap-5 relative">
      <div className="flex flex-col md:flex-row gap-5">
        <input
          type="text"
          className="border w-full md:w-[200px] h-[45px] md:h-[45px] pl-2 rounded-md outline-none"
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
          <div className="absolute md:static top-[70px] flex flex-col gap-3 border bg-white w-full md:w-[200px] p-5 max-h-[250px] md:max-h-[250px] overflow-scroll rounded-md">
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
      </div>
      <FaArrowRight className="text-blue-500 text-[20px] md:mx-5" />
      <div className="flex flex-col md:flex-row gap-5">
        <input
          type="text"
          className="border w-full md:w-[200px] h-[45px] md:h-[45px] pl-2 rounded-md outline-none"
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
          <div className="absolute md:static top-[70px] md:left-[340px] flex flex-col gap-3 border bg-white w-full md:w-[200px] p-5 max-h-[250px] md:max-h-[250px] overflow-scroll rounded-md">
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
      </div>
      <div className="border flex h-[45px] items-center gap-2 md:pl-2 rounded-md w-full md:w-[150px] relative">
        <BsCalendar
          className="text-[25px] cursor-pointer"
          onClick={() => setCalendarVisible(!calendarVisible)}
        />
        <span>{date}</span>
        {calendarVisible && (
          <div className="absolute top-[50px] md:right-0">
            <Calendar
              onChange={handleCalendarChange}
              value={new Date(date)}
              style={{ width: "250px" }}
            />
          </div>
        )}
      </div>
      <div className="border p-2 bg-blue-500 rounded-lg md:ml-2">
        <BsSearch
          className="text-[25px] text-white cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchTrip;


import {
  Fragment,
  FC,
  useState,
  ChangeEvent,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { HighlightText } from "@utils/HighlightText";
import "./AutoComplete.sass";
interface AutoCompleteProps {
  data: string[] | undefined;
  isLoading: boolean;
  error: string | undefined;
}

type SearchState = {
  text: string;
  suggestions: string[] | undefined;
};

const AutoComplete: FC<AutoCompleteProps> = ({ data, isLoading, error }) => {
  useEffect(() => {
    setSearch({ ...search, suggestions: data });
  }, [data]);
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);
  const [search, setSearch] = useState<SearchState>({
    text: "",
    suggestions: data ?? [],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  // Filter data based on input value {value: string} @returns Promise<string[]>
  const filterData = async (value: string) => {
    const regex = new RegExp(`^${value}`, "i");
    return data?.sort().filter((d: string) => regex.test(d)) ?? [];
  };

  // Handle input change {e: React.ChangeEvent<HTMLInputElement>} @returns void
  const onTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let suggestions: string[] = [];
    // if there is a value, filter our data, otherwise return all
    if (value.length > 0) {
      suggestions = await filterData(value);
    } else {
      suggestions = data?.sort() ?? [];
    }
    setIsComponentVisible(value.length > 0);
    setSearch({ suggestions, text: value });
  };

  // Handle selection change {e: string} @returns void
  const onSelectionClick = (e: string): void => {
    const value = e;
    const suggestions: string[] = [value];
    setSearch({ suggestions, text: value });
  };

  return (
    <Fragment>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="auto-complete">
          <p>{search.suggestions?.length} results found</p>
          <div>
            <input
              className="auto-complete__input"
              value={search.text}
              type="text"
              placeholder="Search"
              onChange={onTextChange}
              ref={inputRef}
            ></input>
            <button
              type="button"
              className="auto-complete__btn"
              onClick={() => setIsComponentVisible(!isComponentVisible)}
            >
              {isComponentVisible ? "-" : "+"}
            </button>
          </div>
          <ul
            className="auto-complete__list"
            id="countries"
            onClick={() => setIsComponentVisible(false)}
            style={{
              display: isComponentVisible ? "block" : "none",
            }}
          >
            {search.suggestions?.map((suggestion, i) => {
              return (
                <li
                  className="auto-complete__list__item"
                  onClick={() => onSelectionClick(suggestion)}
                  key={i}
                >
                  {HighlightText({
                    text: suggestion,
                    highlight: search.text,
                    color: "#35aca2",
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

export default AutoComplete;

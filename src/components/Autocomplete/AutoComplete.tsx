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
import { useDebounce } from "@utils/Debounce";
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
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);

  const [search, setSearch] = useState<SearchState>({
    text: "",
    suggestions: data ?? [],
  });
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const debouncedInputValueHook = useDebounce(search.text, 300);

  useEffect(() => {
    setSearch((prevSearch) => ({ ...prevSearch, suggestions: data }));
  }, [data]);

  // Filter data based on input value {value: string} @returns Promise<string[]>
  const filterData = async (value: string) => {
    const regex = new RegExp(`^${value}`, "i");
    return data?.sort().filter((d: string) => regex.test(d)) ?? [];
  };

  // Handle input change {e: React.ChangeEvent<HTMLInputElement>} @returns void
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setIsComponentVisible(text.length > 0);
    setSearch((prevState) => ({ ...prevState, text }));
  };

  // Filter data on input change
  useEffect(() => {
    (async () => {
      const suggestions = await filterData(debouncedInputValueHook);
      setSearch((prevSearch) => ({ ...prevSearch, suggestions }));
    })();
  }, [debouncedInputValueHook]);

  // Handle selection change {e: string} @returns void
  const onSelection = (e: string): void => {
    setSearch({ suggestions: [e], text: e });
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
                  onClick={() => onSelection(suggestion)}
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

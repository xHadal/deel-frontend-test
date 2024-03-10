import { FC, useEffect, useState } from "react";

interface FetchDataProps {
  apiUrl: string;
  WrappedComponent: FC<{
    data: string[] | undefined;
    isLoading: boolean;
    error: string | undefined;
  }>;
}
interface FetchedData {
  data: [] | undefined;
  isLoading: boolean;
  error: string | undefined;
}

const FetchData: FC<FetchDataProps> = ({
  apiUrl,
  WrappedComponent,
}: FetchDataProps) => {
  const [fetchData, setFetchedData] = useState<FetchedData>({
    data: undefined,
    isLoading: false,
    error: undefined,
  });

  useEffect(() => {
    (async () => {
      // Set loading state to true
      setFetchedData({ data: undefined, isLoading: true, error: undefined });
      try {
        const response = await fetch(apiUrl);
        const responseJSON = await response.json();
        if (responseJSON) {
          // Map response data to an array of country names
          const filteredData = responseJSON
            .map((item: any) => item.name.official)
            .sort();
          setFetchedData({
            data: filteredData,
            isLoading: false,
            error: undefined,
          });
        }
      } catch (error) {
        // Set error state if request fails
        setFetchedData({
          data: undefined,
          isLoading: false,
          error: String(error),
        });
      }
    })();
  }, [apiUrl]);

  return <WrappedComponent {...fetchData} />;
};

export default FetchData;

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import useSWRInfinite from "swr/infinite";
import { IGenres, IFilters } from "interfaces/explore";
import { filterByCategory, getAllGenres } from "apis/configAPI";
import { useTranslation } from "react-i18next";
import MovieList from "components/movie/MovieList";
import Tabs from "components/Tabs/Tabs";
import LoadingSpinner from "components/loading/LoadingSpinner";
import { IMovieCard } from "interfaces/components";
import EndOfPage from "components/notification/EndOfPage";
import ExploreFilter from "module/explore/ExploreFilter";

export const StyledExplore = styled.div`
  .genre-item:first-child {
    background-color: red;
  }
  .loading-spinner {
    margin: 20px auto;
    width: 40px;
  }
`;

const defaultGenresTab = 2;
const initialFilters = {
  area: "",
  category: "",
  year: "",
  subtitles: "",
  order: "up",
  params: "",
  sort: "",
  size: 14,
};

const Explore = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [selectedTabId, setSelectedTabId] = useState<number>(defaultGenresTab);
  const [allGenres, setAllGenres] = useState<IGenres[]>([]);
  const [filters, setFilters] = useState<IFilters>(initialFilters);
  const [exploreList, setExploreList] = useState<IMovieCard[]>([]);

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const { data } = await getAllGenres();
      const defaultGenre = data.filter((genre: any) => genre.id === defaultGenresTab)[0];
      setAllGenres(data);
      setFilters({ ...filters, params: defaultGenre.params });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onClickTab = (keyTab: number) => {
    setSelectedTabId(keyTab);
    const genreTab = allGenres.filter((genre) => genre.id === keyTab)[0];
    setFilters({ ...initialFilters, params: genreTab.params });
  };

  const getKey = (index: any, prevData: any) => {
    if (prevData && prevData.length === 0) return null;
    const sort = prevData?.data?.searchResults.slice(-1)[0].sort || "";
    return `${JSON.stringify(filters)}sort-${sort}`;
  };
  const { data, error, setSize } = useSWRInfinite(
    getKey,
    (key) => filterByCategory({ ...filters, sort: key.split("sort-")[1] }),
    {
      revalidateFirstPage: false,
    },
  );

  useEffect(() => {
    if (!data) return;
    const newData = data?.reduce(
      (prevData: any, currData: any) => [...prevData, ...currData.data.searchResults],
      [],
    );
    setExploreList(newData);
    console.log(newData);
  }, [data]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.title = `Youme - ${t("Explore")}`;
    fetchGenres();
  }, []);

  return (
    <StyledExplore className="container">
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          {/* All tab filter movie by category */}
          <Tabs onClick={onClickTab} tabs={allGenres} selectedTabId={selectedTabId} />
          <ExploreFilter
            allGenres={allGenres}
            filters={filters}
            setFilters={setFilters}
            selectedTabId={selectedTabId}
            setExploreList={setExploreList}
          />
          {/* All movie has been filtered */}
          {exploreList.length > 0 && (
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={() => setSize((size) => size + 1)}
              hasMore={!error && data?.slice(-1)[0].data.searchResults.length !== 0}
              loader={<LoadingSpinner />}
              endMessage={<EndOfPage />}
            >
              <MovieList movieList={exploreList} />
            </InfiniteScroll>
          )}
        </>
      )}
    </StyledExplore>
  );
};

export default Explore;

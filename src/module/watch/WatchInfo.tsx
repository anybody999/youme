import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { IDetailMovie } from "interfaces/detail";
import { IDetailCurrentPlay } from "interfaces/watch";
import Heading from "components/heading/Heading";
import WatchMeta from "./WatchMeta";
import WatchCategory from "./WatchCategory";
import WatchUpcoming from "./WatchUpcoming";
import WatchSummary from "./WatchSummary";

interface WatchInfoProps {
  detailMovie: IDetailMovie;
  detailCurrentPlay: IDetailCurrentPlay;
}

const StyledWatchInfo = styled.div`
  padding-top: 20px;
  line-height: 1.7;
`;

const WatchInfo = ({ detailMovie, detailCurrentPlay }: WatchInfoProps) => {
  const { t } = useTranslation();
  const { seriesNo } = detailCurrentPlay;
  const {
    name,
    score,
    areaList,
    episodeCount,
    year,
    tagList,
    updateInfo,
    introduction,
    episodeVo,
  } = detailMovie;

  return (
    <StyledWatchInfo>
      <Heading fontSize="2.2rem">
        {name} - {t("Ep")} {seriesNo}
      </Heading>
      <WatchMeta
        areaList={areaList}
        countCurrEpisode={episodeCount}
        countFullEpisode={episodeVo?.length}
        year={year}
        score={score}
      />
      <WatchCategory categories={tagList} />
      <WatchUpcoming updatePeriod={updateInfo?.updatePeriod} />
      <WatchSummary introduction={introduction} />
    </StyledWatchInfo>
  );
};

export default WatchInfo;
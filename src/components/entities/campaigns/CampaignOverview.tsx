import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Campaign from "../../../data/campaign/Campaign";
import Filter from "../../../data/Filter";
import { reciveAllFiltered } from "../../../services/DatabaseService";

import AppWrapper from "../../AppWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingSpinner } from "../../Loading";
import CampaignTile from "./CampaignTile";
import CampaignSearchBar from "./CampaignSearchBar";

const CampaignOverview = () => {
  const [filters, setFilter] = useState<Filter[]>([]);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [scrollParam, setParam] = useState<{
    start: number;
    end: number;
    hasMore: boolean;
  }>({
    start: 100,
    end: 120,
    hasMore: true,
  });

  useEffect(() => {
    reciveAllFiltered("campaigns", filters, (results: any[]) => {
      setAllCampaigns(results);
      setCampaigns(results.slice(0, 100));
      if(results.length === 0){
        setParam({
          start: 0,
          end: 0,
          hasMore: false,
        });
      }
    });
  }, [filters]);

  const fetchMoreData = () => {
    if (campaigns.length === allCampaigns.length) {
      setParam({
        start: scrollParam.start + 20,
        end: scrollParam.end + 20,
        hasMore: false,
      });
      return;
    }
    setCampaigns((s) =>
      s.concat(allCampaigns.slice(scrollParam.start, scrollParam.end))
    );
    setParam({
      start: scrollParam.start + 20,
      end: scrollParam.end + 20,
      hasMore: true,
    });
  };

  return (
    <AppWrapper>
      <CampaignSearchBar onSend={(filterArray) => setFilter(filterArray)} />
      <CampaignContainer
        dataLength={campaigns.length}
        next={fetchMoreData}
        hasMore={scrollParam.hasMore}
        loader={<LoadingSpinner />}
      >
        {campaigns!.map((campaign: Campaign, index: number) => {
          return <CampaignTile key={index} campaign={campaign}></CampaignTile>;
        })}
      </CampaignContainer>
    </AppWrapper>
  );
};

export default CampaignOverview;

const CampaignContainer = styled(InfiniteScroll)`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
`;

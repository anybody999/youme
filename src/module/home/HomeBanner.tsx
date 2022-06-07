import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { IBanners } from "interfaces/home";
import { getBanners } from "apis/configAPI";
import { PUBLIC_IMAGE } from "constants/path";
import { AnimationSkeleton } from "assets/styles/_mixins";
import { SliderArrow } from "components/SliderArrow/SliderArrow";
import Image from "components/image/Image";

const StyledBanner = styled.div`
  --border-radius: 14px;
  height: 510px;
  border-radius: var(--border-radius);
  background-color: var(--bg-skeleton);
  .banner-loading {
    ${AnimationSkeleton}
    background-size: 100% 100%;
    animation-duration: 4s;
    border-radius: var(--border-radius);
    aspect-ratio: auto 1440 / 512;
  }
  .slick-list {
    height: 100%;
    border-radius: var(--border-radius);
  }
  .slick-slide > div > div {
    outline: none;
    border: none;
  }
  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
    z-index: 10;
    img {
      width: 100%;
      height: 100%;
    }
    &::before {
      display: none;
    }
  }
  .banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1440px) {
    height: 40vw;
    .banner-image {
      height: 40vw;
    }
  }
  @media screen and (max-width: 750px) {
    height: 54vw;
    .banner-image {
      height: 54vw;
    }
  }

  @media screen and (max-width: 767.98px) {
    .banner-loading {
      aspect-ratio: auto 792/445;
    }
    .slick-prev {
      left: 0;
    }
    .slick-next {
      right: 0;
    }
  }
`;

const settingsBanner = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: (
    <SliderArrow onClick={undefined} style={undefined} className="">
      <img src={`${PUBLIC_IMAGE}/arrow-back.svg`} alt="Prev" />
    </SliderArrow>
  ),
  nextArrow: (
    <SliderArrow onClick={undefined} style={undefined} className="">
      <img src={`${PUBLIC_IMAGE}/arrow-next.svg`} alt="Next" />
    </SliderArrow>
  ),
};

const HomeBanner = () => {
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState<IBanners[]>([]);
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const { data } = await getBanners({ size: 10 });
        setBanners(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div className="container">
      <StyledBanner>
        {loading && <div className="banner-loading" />}
        {!loading && (
          <Slider {...settingsBanner}>
            {banners.map((banner) => {
              const category = banner.jumpType === "DRAMA" ? 1 : 0;
              const url = `/detail/${banner.jumpParam}?cate=${category}`;
              return (
                <Link to={url} key={banner.id}>
                  <Image
                    className="banner-image"
                    to={url}
                    url={`${banner.imgUrl}?imageMogr2/format/webp/format/webp`}
                    width="1440"
                    alt="banner"
                  />
                </Link>
              );
            })}
          </Slider>
        )}
      </StyledBanner>
    </div>
  );
};

export default HomeBanner;

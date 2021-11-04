import React, { useState } from "react";
import styled from "styled-components/native";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: 0px 10px 0;
`;
const Content = styled(View)`
  flex: 1;
`;

const GalleryWrap = styled(View)``;

const CarousalWrap = styled(View)`
  overflow: hidden;
`;

const galleryImages = [
  {
    imageSource: {
      uri:
        "https://www.emanara.com/pub/media/Page_images/emanara-weleda-banner-1.jpg",
    },
  },
  {
    imageSource: {
      uri:
        "https://www.emanara.com/pub/media/Page_images/emanara-weleda-banner-2.jpg",
    },
  },
  {
    imageSource: {
      uri:
        "https://www.emanara.com/pub/media/Page_images/emanara-weleda-banner-3.jpg",
    },
  },
];
const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 18.5);
const imageWidth = dimensions.width;
const GalleryItem = ({ imageSource }) => (
  <GalleryWrap>
    <TouchableHighlight>
      <Image
        source={imageSource}
        style={{ height: imageHeight, width: imageWidth, resizeMode: "cover" }}
      />
    </TouchableHighlight>
  </GalleryWrap>
);
function BannerSlider({ thumbName, pro }) {
  const onChangeSearch = (query) => setSearchQuery(query);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderGalleryItem = ({ item, index }) => (
    <GalleryItem imageSource={item.imageSource} />
  );

  return (
    <Container>
      <Content>
        <ScrollView>
          <CarousalWrap>
            <Carousel
              data={galleryImages}
              renderItem={renderGalleryItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={galleryImages.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                width: 20,
                height: 4,
                borderRadius: 3,
                marginHorizontal: 1,
                backgroundColor: "#256a00",
              }}
              inactiveDotStyle={{
                width: 20,
                height: 4,
                borderRadius: 3,
                marginHorizontal: 1,
                backgroundColor: "#d3ccb3",
              }}
              containerStyle={{
                marginTop: -50,
              }}
              inactiveDotOpacity={0.8}
              inactiveDotScale={0.8}
            />
          </CarousalWrap>
        </ScrollView>
      </Content>
    </Container>
  );
}

export default BannerSlider;

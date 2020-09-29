import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
// const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const styles = {
  tabs: {
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

function slideRenderer(params) {
  const { index, key } = params;
  let style;

  switch (mod(index, 3)) {
    case 0:
      style = styles.slide1;
      break;

    case 1:
      style = styles.slide2;
      break;

    case 2:
      style = styles.slide3;
      break;

    default:
      break;
  }

  return (
    <div style={Object.assign({}, styles.slide, style)} key={key}>
      {`slide n°${index + 1}`}
    </div>
  );
}

const Layout2 = (props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabCount = 100;
  const tabLabels = Array.from(new Array(tabCount).keys()).map(i => <Tab key={i} label={`Tab ${i}`} />);
  const tabPages = Array.from(new Array(tabCount).keys()).map(i => {
    const styleToAdd = i % 2 === 0 ? styles.slide1 : styles.slide2;
    return (
      <div key={i} style={Object.assign({}, styles.slide, styleToAdd)}>
        Tab {i}
      </div>
    );
  });

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={(event, value) => setTabIndex(value)}
        style={styles.tabs}
        >
        {tabLabels}
      </Tabs>

      {/* <SwipeableViews
        index={tabIndex}
        onChangeIndex={(index) => setTabIndex(index)}
        resistance
        >
        {tabPages}
      </SwipeableViews> */}

      <BindKeyboardSwipeableViews
        index={tabIndex}
        onChangeIndex={(index) => setTabIndex(index)}
        resistance
        >
        {tabPages}
      </BindKeyboardSwipeableViews>

      {/* <VirtualizeSwipeableViews
        index={tabIndex}
        onChangeIndex={(index) => setTabIndex(index)}
        disableLazyLoading={true}
        resistance={true}
        overscanSlideBefore={2}
        overscanSlideAfter={2}
        slideCount={tabCount}
        slideRenderer={slideRenderer}
      /> */}

      <Button onClick={() => setTabIndex(49)}>{'go to slide n°50'}</Button>
    </>
  );
}

export default Layout2;

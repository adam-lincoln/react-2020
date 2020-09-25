import React from 'react';
import ItemList from '../../components/ItemList/ItemList';
import ItemTable from '../../components/ItemTable/ItemTable';
import Builder from '../Builder/Builder';

const TABLE_HEADERS = [
  "name",
  "weight",
  "acceleration",
  "traction_onroad",
  "traction_offroad",
  "turbo_mini",
  "speed_land",
  "speed_water",
  "speed_antigravity",
  "speed_air",
  "handling_land",
  "handling_water",
  "handling_antigravity",
  "handling_air"
];

const Layout = (props) =>
  <>

    <header>
      <h1>Daisy Me Rollin'</h1>
      <span style={{ fontStyle: 'italic' }}>A Mario Kart 8 Deluxe builder</span>
    </header>

    <main>

      <Builder
        driverList={props.driverList}
        vehicleList={props.vehicleList}
        tyreList={props.tyreList}
        gliderList={props.gliderList}
        />

      <h1>Data Tables</h1>
      <ItemTable title="Driver Table" tableHeaders={TABLE_HEADERS} itemList={props.driverList} />
      <ItemTable title="Vehicle Table" tableHeaders={TABLE_HEADERS} itemList={props.vehicleList} />
      <ItemTable title="Tyre Table" tableHeaders={TABLE_HEADERS} itemList={props.tyreList} />
      <ItemTable title="Glider Table" tableHeaders={TABLE_HEADERS} itemList={props.gliderList} />

      <h1>Data Lists</h1>
      <ItemList title="Driver List" itemList={props.driverList} />
      <ItemList title="Vehicle List" itemList={props.vehicleList} />
      <ItemList title="Tyre List" itemList={props.tyreList} />
      <ItemList title="Glider List" itemList={props.gliderList} />

      <h1>References</h1>
      <ul>
        <li><a href="https://gamesites.nintendo.com.au/mario-kart-8-deluxe/">Nintendo | Mario Kart 8 Deluxe </a></li>
        <li><a href="https://www.mariowiki.com/Mario_Kart_8_Deluxe">MarioWiki | Mario Kart 8 Deluxe</a></li>
        <li><a href="https://www.mariowiki.com/Mario_Kart_8_Deluxe_in-game_statistics">MarioWiki | Mario Kart 8 Deluxe | In-game statistics</a></li>
        <li><a href="https://www.mk8dxbuilder.com/">Mario Kart 8 Deluxe Builder 1.1</a></li>
      </ul>

    </main>

    <footer>
    </footer>

  </>

export default Layout;

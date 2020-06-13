import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
const RegionFilterStyled = styled.div`
@import url('https://fonts.google.com/specimen/Nunito+Sans');
* {
    box-sizing: border-box;
}
.dropdown {
  border-radius: 5px;
  background-color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  padding: 20px;
  position: relative;
  background: var(--white);
}
.btn-toggle .fas {
  display: none;
}

body.dark .btn-toggle .fas {
  display: inline-block;
}


.dropdown .fa-chevron-down {
  margin-left: 10px;
}

.dropdown ul {
border-radius: 4px;
  background-color: var(--background-el);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.12);
  display: none;
  padding: 0px 0px 0px 0px;
  text-align: initial;
  position: absolute;
  padding:10px;
  top: 100%;
  left: 0;
  list-style-type: none;
  background: var(--white);
  width: 100%;
  z-index: 99;
}

.dropdown.open ul {
  display: block;
}

.dropdown ul li {
  padding: 4px 10px;
}

.fa-chevron-up {
  margin-left: 10px;  
}
li:hover {
  color: gray;
}
`

const filterByRegionAction = (regionSelected) => {
  return {
    type: 'FILTER_BY_REGION',
    payload: { regionSelected },
  };
}

export const Region = () => {
  const dispatch = useDispatch();
  const [dropdown, setdropdown] = useState(true)
  const filterByRegion = useSelector((state) => state.filterByRegion);

  const onRegionChange = (selectEvent) => {
    dispatch(filterByRegionAction(selectEvent));
  }

  return (
    <>
    <RegionFilterStyled>

    <div className={`${dropdown?'dropdown open':'dropdown'}`} onClick={()=> setdropdown(!dropdown)} id="filter" tabIndex="0" onBlur={()=> setdropdown(false)}>
          Filter by Region
          <i className={`fas ${!dropdown?'fa-chevron-up':'fa-chevron-down'}`}></i>
          <ul>
            <li onClick={()=>onRegionChange('')}>All</li>
            <li onClick={()=>onRegionChange('Africa')}>Africa</li>
            <li onClick={()=>onRegionChange('Americas')}>Americas</li>
            <li onClick={()=>onRegionChange('Asia')}>Asia</li>
            <li onClick={()=>onRegionChange('Europe')}>Europe</li>
            <li onClick={()=>onRegionChange('Oceania')}>Oceania</li>
          </ul>
        </div>
    </RegionFilterStyled>
    </>
  )
}
import React, {useState, useMemo} from 'react';
import {Dropdown} from 'semantic-ui-react';
import dropdownIcon from '../../images/dropdown.png';
import searchIcon from '../../images/searchIcon.png';
import {CustomImage} from './CustomImage';

/**
 *
 * @param {string} searchValue
 * @param {string} searchInput
 * @param {function} setSearchInput
 * @param {Array} options
 * @param {function} setFilteredOption
 */

const searchQuery = (searchValue, searchInput, setSearchInput, options) => {
  setSearchInput(searchValue);
  const filteredData = options?.filter(
    item =>
      item.value
        ?.toLocaleLowerCase?.()
        ?.includes(searchValue?.toLocaleLowerCase()) ||
      item.label
        ?.toLocaleLowerCase?.()
        ?.includes(searchValue?.toLocaleLowerCase()) ||
        item.subCategories
        ?.toLocaleLowerCase?.()
        ?.includes(searchValue?.toLocaleLowerCase()) ||
      item.text
        ?.toLocaleLowerCase?.()
        ?.includes(searchValue?.toLocaleLowerCase()),
  );
  
  return filteredData || [];
};

const dropdownList = (filteredOptions, onClickItem, menuIconStyle) => {
  return (
    <>
      {filteredOptions?.map(option => (
        <Dropdown.Item key={option.key} onClick={onClickItem(option)}>
          <div style={menuIconStyle} key={option.key}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
              {option.iconLabel && (
                <img src={option.iconLabel} alt="" width="20px" />
              )}
              {option?.label && <span>{option?.label}</span>}
            </div>
            {option.text && <span>{option.text}</span>}
          </div>
        </Dropdown.Item>
      ))}
    </>
  );
};

const CustomDropdown = ({
  label,
  options,
  OnChange,
  value,
  extraCss,
  style,
  searchPlaceholder,
  fallBackIcon,
  placeholder,
  minHeight = '36px',
  ...otherProps
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const onClickItem = option => e => OnChange(e, option);

  const filteredOptions = useMemo(
    () => searchQuery(searchValue, searchInput, setSearchInput, options),
    [options, searchValue, searchInput],
  );

  const customStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#F3F5F6',
    padding: '8px',
    minHeight: minHeight,
    ...style,
  };

  const menuIconStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
  };


  return (
    <div className={`select_input ${extraCss || '_margin'}`}>
      {label && (
        <label className="select_title" htmlFor={label}>
          {label}
        </label>
      )}
      <Dropdown
        fluid
        icon={<img src={dropdownIcon} width="12px" className="" alt="caret" />}
        clearable
        floating
        text={
          <div style={{display: 'flex', alignItems: 'center', width: "90%"}}>
            <span>
              {value?.iconLabel && (
                <img src={value?.iconLabel} width="17px" alt="icon" />
              )}{' '}
              <span
                className="select-dropdown-text"
                style={{
                  padding: '0 6px',
                  fontWeight: '400',
                  fontSize: '0.876rem',
                  lineHeight: '20px',
                  color: placeholder ? '#848F9F' : '#353F50',
                }}>
                {value?.label || placeholder}
              </span>
            </span>
          </div>
        }
        style={customStyle}
        {...otherProps}>
        <Dropdown.Menu style={{width: "100%"}}>
          <div className="dropdown__search">
            <CustomImage
              src={searchIcon}
              defaultSrc={fallBackIcon}
              alt="search"
              width="16px"
              style={{position: 'absolute', top: '23px', left: '14px'}}
            />
            <input
              icon="search"
              iconposition="left"
              onChange={e => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              onClick={function (e) {
                e.stopPropagation();
              }}
              onKeyDown={e => {
                e.code === 'Space' && e.stopPropagation();
              }}
            />
          </div>
          <Dropdown.Menu scrolling>
            {filteredOptions?.map(option => (
              <Dropdown.Item key={option.key} onClick={onClickItem(option)}>
                <div style={menuIconStyle} key={option.key}>
                  <div
                    style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    {option.iconLabel && (
                      <CustomImage
                        defaultSrc={fallBackIcon}
                        src={option.iconLabel}
                        alt=""
                        width="20px"
                      />
                    )}
                    {option?.label && (
                      <span>{option?.label?.slice(0, 20 - 1)}</span>
                    )}
                  </div>
                  {option.text && <span>{option.text}</span>}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};


const CustomDropdown2 = ({
  label,
  options,
  OnChange,
  value,
  extraCss,
  placeholder,
  style,
  searchPlaceholder,
  ...otherProps
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const filteredOptions = useMemo(
    () => searchQuery(searchValue, searchInput, setSearchInput, options),
    [options, searchValue, searchInput],
  );

  const customStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#F3F5F6',
    padding: '8px',
    minHeight: '48px',
    ...style,
  };

  return (
    <div className={`select_input ${extraCss || '_margin'}`}>
      {label && (
        <label className="select_title" htmlFor={label}>
          {label}
        </label>
      )}
      <Dropdown
        fluid
        icon={<img src={dropdownIcon} width="12px" className="" alt="caret" />}
        clearable
        floating
        text={value || placeholder}
        style={customStyle}
        {...otherProps}>
        <Dropdown.Menu>
          <div className="dropdown__search">
            <img
              src={searchIcon}
              alt="search"
              width="16px"
              style={{position: 'absolute', top: '23px', left: '14px'}}
            />
            <input
              icon="search"
              iconposition="left"
              onChange={e => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              onClick={e => e.stopPropagation()}
            />
          </div>
          <Dropdown.Menu scrolling>
            {filteredOptions?.map(option => (
              <Dropdown.Item
                key={option.key}
                {...option}
                onClick={e => OnChange(e, option)}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const CustomDropdownWithTabs = ({
  label,
  options,
  OnChange,
  value,
  extraCss,
  style,
  searchPlaceholder,
  placeholder,
  ...otherProps
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedId, setSelectedId] = useState('Daily ');
  const [searchValue, setSearchValue] = useState('');
  const onClickItem = option => e => OnChange(e, option);
  const onSelectd = id => {
    setSelectedId(id);
  };
  const getOptionByPeriod = useMemo(
    () =>
      options?.filter(
        option =>
          option?.period?.toLowerCase().trim() ===
          selectedId?.toLowerCase().trim(),
        [options, selectedId],
      ),
    [options, selectedId],
  );
  const filteredOptions = useMemo(
    () =>
      searchQuery(searchValue, searchInput, setSearchInput, getOptionByPeriod),
    [getOptionByPeriod, searchValue, searchInput],
  );

  const dropdownTabs = [
    {
      id: 1,
      name: 'Daily',
    },
    {
      id: 2,
      name: 'Weekly',
    },
    {
      id: 3,
      name: 'Monthly',
    },
    {
      id: 4,
      name: 'Others',
    },
  ];

  const customStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#F3F5F6',
    padding: '8px',
    minHeight: '36px',
    ...style,
  };

  const menuIconStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  return (
    <div className={`select_input ${extraCss || '_margin'}`}>
      {label && (
        <label className="select_title" htmlFor={label}>
          {label}
        </label>
      )}
      <Dropdown
        fluid
        icon={<img src={dropdownIcon} width="12px" className="" alt="caret" />}
        clearable
        floating
        text={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span>
              {value?.iconLabel && (
                <img src={value?.iconLabel} width="17px" alt="" />
              )}{' '}
              <span
                className="select-dropdown-text"
                style={{
                  padding: '0 6px',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: placeholder ? '#848F9F' : '#353F50',
                }}>
                {value?.label || placeholder}
              </span>
            </span>
          </div>
        }
        style={customStyle}
        {...otherProps}>
        <Dropdown.Menu>
          <div className="dropdown__search">
            <img
              src={searchIcon}
              alt="search"
              width="16px"
              style={{position: 'absolute', top: '23px', left: '14px'}}
            />
            <input
              icon="search"
              iconposition="left"
              onChange={e => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              onClick={function (e) {
                e.stopPropagation();
              }}
              onKeyDown={e => {
                e.code === 'Space' && e.stopPropagation();
              }}
            />
          </div>
          <div className="menu__list__data">
            {dropdownTabs.map(dropdownTab => (
              <div
                key={dropdownTab.id}
                onClick={e => {
                  e.stopPropagation();
                  onSelectd(dropdownTab.name);
                }}
                onKeyDown={e => {
                  e.code === 'Space' && e.stopPropagation();
                }}
                className={`${
                  selectedId === dropdownTab.name && 'active'
                } __items`}>
                {dropdownTab.name}
              </div>
            ))}
          </div>

          <Dropdown.Menu scrolling>
            {dropdownList(filteredOptions, onClickItem, menuIconStyle)}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export {CustomDropdown, CustomDropdown2, CustomDropdownWithTabs};
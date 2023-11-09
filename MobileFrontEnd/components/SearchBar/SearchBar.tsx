import React from 'react';
import { TextInput, View } from 'react-native';
import style, { iconSize } from './style';
import SearchIcon from '@assets/icon-search.svg'

interface Props {
    onChange?: () => void,
}

const SearchBar = (props: Props) => {

    const handleChange = () => {
        if (props.onChange) 
        props.onChange()
    }

  return (
    <View style={style.cont}>
        <TextInput 
            style={style.input} 
            placeholder='Search' 
            placeholderTextColor={'#ccc'}
            onChange={handleChange}></TextInput>
        <SearchIcon style={style.icon} width={iconSize} height={iconSize} />
    </View>
  )
}

export default SearchBar
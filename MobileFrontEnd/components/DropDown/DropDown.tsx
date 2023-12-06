import React from 'react'
import { TextInput, View, Text } from 'react-native'
import style from './style'
import { Dropdown } from 'react-native-element-dropdown'
import { backGroundColor, backGroundColorTwo, borderRadiusSmall, colorInput, colorPlaceholder } from '@gStyle'


enum SortOptions {
    ascending,
    descending,
}

interface Props {
    onChange: (value: [string, SortOptions]) => void
}

const DropDown = (props: Props) => {

    const data: { label: string, value: [string, SortOptions] }[] = [
        { label: 'price ascending', value: ['price', SortOptions.ascending] },
        { label: 'price descending', value: ['price', SortOptions.descending] },
        { label: 'alphabeticaly ascending', value: ['name', SortOptions.ascending] },
        { label: 'alphabeticaly descending', value: ['name', SortOptions.descending] },
    ]

    return (
        <Dropdown
            style={style.dropDown}
            data={data}
            labelField={'label'}
            valueField={'value'}
            placeholder='Sort by'
            placeholderStyle={{ color: colorPlaceholder }}
            selectedTextStyle={{ color: 'white', backgroundColor: backGroundColorTwo }}
            containerStyle={{ backgroundColor: backGroundColorTwo, borderColor: backGroundColorTwo, borderRadius: borderRadiusSmall }}
            productTextStyle={{ color: 'white' }}
            renderItem={({ label }, active) => {
                return (
                    <Text
                        style={{
                            color: 'white',
                            backgroundColor: active ? colorInput : backGroundColorTwo,
                            paddingVertical: 20,
                            paddingHorizontal: 12,
                        }}
                    >
                        {label}
                    </Text>
                );
            }}
            iconColor='white'
            onChange={(i) => props.onChange(i.value)}

        >
        </Dropdown>
    )
}

export default DropDown
import React from 'react'
import { TextInput, View, Text } from 'react-native'
import style from './style'
import { Dropdown } from 'react-native-element-dropdown'
import { backGroundColor, backGroundColorTwo, borderRadiusSmall, colorInput, colorPlaceholder } from '@gStyle'
import { OrderByParams } from '@interfaces'

interface Props {
    onChange: (value: OrderByParams) => void
}

const DropDown = (props: Props) => {

    const data: { label: string, value: OrderByParams }[] = [
        { label: '$', value: { property: 'price', direction: 'asc' } },
        { label: '$$$', value: { property: 'price', direction: 'desc' } },
        { label: 'A to Z', value: { property: 'name', direction: 'asc' } },
        { label: 'Z to A', value: { property: 'name', direction: 'desc' } },
        { label: 'newest', value: { property: 'added', direction: 'desc' } },
        { label: 'oldest', value: { property: 'added', direction: 'asc' } },
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
            itemTextStyle={{ color: 'white' }}
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
        />
    )
}

export default DropDown
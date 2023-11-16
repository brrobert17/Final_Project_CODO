import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate, Extrapolate, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
    width: number,
    height: number
}

const LogoComponent = (props: Props) => {
    const opacityValue = useSharedValue(1); // Initially fully visible

    const onPressHandler = () => {
        // Toggle the opacity between 1 and 0 on each button press
        opacityValue.value = opacityValue.value === 1 ? 0 : 1;
        console.log('bum sakalaka')
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(opacityValue.value, {
                duration: 500, // Duration of the fade animation
            }),
        };
    });

    return (
        <>
            {/* <AnimatedPath
            style={animatedStyle}
            d="..." // The path data for your waves
            fill="..." // Fill color for the waves
            // other attributes
            /> */}
            <Svg
                width={props.width}
                height={props.height}
                viewBox="0 0 4505 556" // for clipped use this - viewBox="2080 0 4505 556"
                fill="none"
                onTouchEnd={onPressHandler}
            >
                <AnimatedPath
                    style={animatedStyle}
                    opacity={0.958}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 362.855a3646.17 3646.17 0 00408.431 63.775c243.293 24.076 485.732 17.443 727.319-19.899 137.42-26.067 276.06-40.992 415.89-44.774 176.02-5.238 349.97 11.069 521.86 48.922v-21.883a2144.277 2144.277 0 00-242.27-37.983c-202.4-18.295-404.05-11.994-604.94 18.904a2778.754 2778.754 0 01-370.126 45.768c-238.544 12.045-475.344-3.211-710.403-45.768A30163.048 30163.048 0 010 342.138v20.717zm0-50.707c159.274 35.081 320.292 58.648 483.053 70.704 217.903 16.224 434.805 7.601 650.707-25.869a2662.515 2662.515 0 01339.28-41.789c202.25-12.586 402.41 2.397 600.46 44.95V339.46a2033.495 2033.495 0 00-272.12-41.18c-193.18-14.874-385.55-7.578-577.08 21.889-173.53 33.24-348.644 49.988-525.34 50.246C463.143 368.774 230.157 342.279 0 290.929v21.219z"
                    fill="#007BFF"
                />
                <AnimatedPath
                    style={animatedStyle}
                    opacity={0.96}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 263.358a3746.423 3746.423 0 00332.814 55.818c299.966 37.289 598.454 28.003 895.466-27.859a2732.948 2732.948 0 01296.5-27.859c185.01-7.648 367.92 8.364 548.72 48.037v-22.068a2190.024 2190.024 0 00-244.26-37.909c-201.39-18.085-402.05-11.783-601.96 18.904-143.66 27.608-288.586 43.858-434.794 48.754C525.088 326.167 260.926 300.244 0 241.408v21.95z"
                    fill="#007AFF"
                />
                <AnimatedPath
                    style={animatedStyle}
                    opacity={0.972}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 210.652a3469.777 3469.777 0 00473.103 69.72c224.938 17.511 448.805 8.556 671.597-26.864a2529.83 2529.83 0 01308.44-38.804c208.92-14.878 415.72-.227 620.36 43.953v-20.792c-112.56-25.03-226.49-40.379-341.77-46.045-168.32-7.876-335.81.746-502.46 25.869-197.85 38.101-397.515 54.684-598.963 49.748C417.715 261.514 207.612 235.48 0 189.333v21.319z"
                    fill="#007BFF"
                />
                {<Path
                    opacity={0.986}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4165.78 0h11c40.77 8.809 72.94 30.475 96.5 65 28.18 40.332 53.84 82.332 77 126 5.01 11.176 6.68 22.842 5 35-2.76 4.267-6.76 6.267-12 6-8.45-1.473-15.95-4.973-22.5-10.5a2182.65 2182.65 0 01-60-51c-44.27-35.098-94.77-54.264-151.5-57.5-43.47 3.601-83.97 16.435-121.5 38.5-1 .667-2 .667-3 0a312.575 312.575 0 0126.5-60.5c3.38-4.26 6.88-8.426 10.5-12.5a543.378 543.378 0 0177-54c21.02-12.198 43.36-20.365 67-24.5z"
                    fill="#FEDF00"
                />}
                <Path
                    opacity={0.992}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4504.78 268v31c-1.95 18.261-5.79 36.261-11.5 54-2.43 7.374-6.27 13.874-11.5 19.5l-3.5.5a132.205 132.205 0 01-35.5-15.5 401.853 401.853 0 01-54-38c-26.05-19.7-48.21-16.2-66.5 10.5a495.166 495.166 0 01-39 62c-42.67 52.926-98.17 82.093-166.5 87.5-25.73 3.606-51.39 3.272-77-1-20.23-5.078-39.23-13.078-57-24-11.33-7-22.67-14-34-21a20.153 20.153 0 00-6-1.5c-3.3.71-6.63 1.043-10 1-7.57.282-14.9 1.282-22 3-7.01.166-14.01 0-21-.5-10.77.145-16.77-5.022-18-15.5-6.66-2.813-8.83-7.813-6.5-15a46.593 46.593 0 014.5-8 593.99 593.99 0 0028-30c4.98-5.275 8.98-11.275 12-18 4.79-9.715 7.79-20.049 9-31 .53-9.66 1.03-19.327 1.5-29 .43-15.656 6.1-28.989 17-40a435.39 435.39 0 0139-63c12.68-14.595 28.18-25.095 46.5-31.5a285.298 285.298 0 0175-22c43.42-1.979 84.08 7.687 122 29a475.271 475.271 0 0131 20 4218.57 4218.57 0 0167 56c4.17 2.917 8.5 5.584 13 8 9.54 4.2 18.21 2.867 26-4a1697.13 1697.13 0 0065.5-73.5 405.26 405.26 0 0124.5-23.5c2.94-2.425 6.27-3.425 10-3a89.645 89.645 0 0111.5 16.5c17.91 34.891 30.07 71.557 36.5 110zm-477 112a83.068 83.068 0 0127 12.5c8.27 9.09 15.93 18.59 23 28.5 21.64-18.927 35.3-42.594 41-71-3.13-1.522-6.46-2.355-10-2.5a138.237 138.237 0 00-36 2 922.81 922.81 0 00-23 6.5c21.34-18.163 46-25.329 74-21.5 7.67 3.018 11.34 8.684 11 17-3.61 32.57-17.95 59.237-43 80a576.674 576.674 0 00-18.5 13.5l-24-46c-6.47-7.314-13.64-13.648-21.5-19z"
                    fill="#FEDE01"
                />
                <Path
                    opacity={0.984}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4353.78 325h9a304.758 304.758 0 01-.5 73 1190.643 1190.643 0 01-16 66c-5.69 25.372-16.69 48.039-33 68-23.89 22.93-51.72 29.43-83.5 19.5-33.04-12.006-62.37-29.839-88-53.5 29.59-6.253 57.59-16.753 84-31.5 32.54-21.545 59.38-48.711 80.5-81.5a1531.237 1531.237 0 0127-45c5.38-7.252 12.22-12.252 20.5-15z"
                    fill="#FEDF00"
                />
                <Path
                    opacity={0.954}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4123.78 496c13.55 17.719 29.55 32.886 48 45.5-32.52 2.216-62.85-4.784-91-21a843.97 843.97 0 01-33-21c14.65.444 29.32.444 44 0 10.89-.454 21.56-1.621 32-3.5z"
                    fill="#FEDF00"
                />
                <Path
                    opacity={0.935}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2268.78 428c37.14-2.531 56.8 14.803 59 52-2.17 37.344-21.84 54.51-59 51.5-19.47-4.807-31.64-16.973-36.5-36.5-5.23-22.939.6-42.439 17.5-58.5 5.95-3.919 12.29-6.752 19-8.5zm4 12c22.55-.953 35.72 9.714 39.5 32 2.89 17.004-1.94 31.171-14.5 42.5-11.77 6.929-23.77 7.262-36 1-8.59-6.335-13.76-14.835-15.5-25.5-2.1-12.721-.1-24.721 6-36 5.12-7.301 11.95-11.967 20.5-14z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.931}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2536.78 428c12.79-1.665 24.79.502 36 6.5 7.31 6.128 11.31 13.961 12 23.5a55.97 55.97 0 00-11.5 2l-2.5-1c-4.21-15.348-14.21-21.515-30-18.5-12.42 2.705-16.59 9.872-12.5 21.5a36.078 36.078 0 004.5 3.5c12.33 3.667 24.67 7.333 37 11 17.4 8.363 22.23 21.53 14.5 39.5-5.32 8.249-12.82 13.416-22.5 15.5-11.25 1.368-22.25.368-33-3-12.45-6.302-19.12-16.469-20-30.5a61.291 61.291 0 0013-3c4.82 21.088 17.82 28.921 39 23.5 13.99-5.333 16.65-14 8-26a68.534 68.534 0 00-15-6 120.334 120.334 0 01-31-10c-9.63-7.663-12.8-17.496-9.5-29.5 4.77-10.28 12.6-16.614 23.5-19z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.924}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2077.78 430c7.36-.331 14.7.003 22 1 9.07 27.048 18.24 54.048 27.5 81 9.08-27.405 18.25-54.739 27.5-82h20v100h-14c.17-26.335 0-52.669-.5-79-9.2 25.925-18.2 51.925-27 78-4.67 1.333-9.33 1.333-14 0-8.8-26.741-17.8-53.407-27-80-.5 26.998-.67 53.998-.5 81h-14V430z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.933}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2383.78 429.999c18.06-.446 36.06.054 54 1.5 12.57 4.286 18.9 13.121 19 26.501-.75 13.923-7.75 23.09-21 27.5a20.187 20.187 0 017.5 7.5 914.584 914.584 0 0118.5 35.999 43.234 43.234 0 01-16 .5c-4.36-9.213-8.86-18.379-13.5-27.5-7.54-12.679-18.7-17.678-33.5-14.999v42.999h-15v-100zm15 12.001c10.71-.312 21.38.188 32 1.5 10.73 4.857 13.57 12.689 8.5 23.5-4.84 5.616-11 8.116-18.5 7.5-7.33.5-14.66.666-22 .5v-33z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.92}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2644.78 430h15c-.17 15.004 0 30.004.5 45a1305.992 1305.992 0 0041.5-44.5 90.455 90.455 0 0119 0 2052.207 2052.207 0 00-37 39.5c12.8 19.969 25.8 39.802 39 59.5-6.03.83-12.03.664-18-.5l-31.5-49c-4.33 4.333-8.67 8.667-13 13-.5 12.329-.67 24.662-.5 37h-15V430z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.926}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2804.78 404c6.04-.329 12.04.004 18 1a554.917 554.917 0 01-14 17.5c-4.04.827-8.04.66-12-.5a108.245 108.245 0 008-18z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.957}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2772.78 430h64v12h-49v30h46v12h-46v34h52v12h-67V430z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.941}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3001.78 430h17a2599.66 2599.66 0 0040 99.5c-5.58.806-11.08.639-16.5-.5a497.82 497.82 0 01-10.5-29h-42a799.845 799.845 0 01-10 30h-15c12.33-33.333 24.67-66.667 37-100zm8 13a618.817 618.817 0 0017 45 256.833 256.833 0 01-32 1 647.28 647.28 0 0015-46z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.92}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3107.78 430h15c-.17 15.004 0 30.004.5 45a1305.992 1305.992 0 0041.5-44.5 90.455 90.455 0 0119 0 2052.207 2052.207 0 00-37 39.5c12.8 19.969 25.8 39.802 39 59.5-6.03.83-12.03.664-18-.5l-31.5-49c-4.33 4.333-8.67 8.667-13 13-.5 12.329-.67 24.662-.5 37h-15V430z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.932}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3225.78 430h16a2539.492 2539.492 0 0128.5 85 4388.362 4388.362 0 0129.5-84 43.234 43.234 0 0116-.5 4347.69 4347.69 0 00-37.5 98.5c-5.33 1.333-10.67 1.333-16 0a5835.246 5835.246 0 01-36.5-99z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.94}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3384.78 430c5.59-.307 11.09.027 16.5 1 13.37 32.905 26.87 65.739 40.5 98.5-5.58.806-11.08.639-16.5-.5-3.7-9.572-7.54-19.072-11.5-28.5-13.66-.5-27.33-.667-41-.5-3.33 10-6.67 20-10 30-5.34.166-10.68-.001-16-.5a2555.076 2555.076 0 0038-99.5zm8 13a753.052 753.052 0 0017 45.5c-10.66.5-21.33.667-32 .5a924.068 924.068 0 0015-46z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.933}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3491.78 429.999c18.06-.446 36.06.054 54 1.5 12.57 4.286 18.9 13.121 19 26.501-.75 13.923-7.75 23.09-21 27.5a20.187 20.187 0 017.5 7.5 914.584 914.584 0 0118.5 35.999 43.234 43.234 0 01-16 .5c-4.36-9.213-8.86-18.379-13.5-27.5-7.54-12.679-18.7-17.678-33.5-14.999v42.999h-15v-100zm15 12.001c10.71-.312 21.38.188 32 1.5 10.73 4.857 13.57 12.689 8.5 23.5-4.84 5.616-11 8.116-18.5 7.5-7.33.5-14.66.666-22 .5v-33z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.917}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3622.78 430h15v100h-15V430z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.952}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3697.78 430h14c-.45 24.377.05 48.71 1.5 73 3.37 11.62 11.21 17.287 23.5 17 16.04-.54 24.21-8.873 24.5-25 .5-21.664.67-43.331.5-65h14c.17 23.002 0 46.002-.5 69-2.05 23.456-14.88 34.456-38.5 33-22.81 1.865-35.64-8.469-38.5-31-.5-23.664-.67-47.331-.5-71z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.923}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3910.78 436c7.1-1.718 14.43-2.718 22-3v97h-14c.17-26.335 0-52.669-.5-79-9.2 25.925-18.2 51.925-27 78-4.67 1.333-9.33 1.333-14 0-8.8-26.741-17.8-53.407-27-80-.5 26.998-.67 53.998-.5 81h-14V430c7.36-.331 14.7.003 22 1 9.07 27.048 18.24 54.048 27.5 81 8.41-25.394 16.91-50.727 25.5-76z"
                    fill="#017BFE"
                />
                <Path
                    opacity={0.982}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3650.78 98h292c.17 28.669 0 57.335-.5 86a2992.609 2992.609 0 01-70.5 59.5 6835.892 6835.892 0 00-122-6l63-53c-54-.5-108-.667-162-.5V98z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.965}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3725.78 257c41.41-.032 82.74 1.635 124 5a1472.309 1472.309 0 01-35 29.5c-42.32-.91-84.65-1.91-127-3 12.92-10.28 25.59-20.78 38-31.5z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.968}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3918.78 318c-1.21 10.951-4.21 21.285-9 31a2441.244 2441.244 0 00-263-9c-.17-5.676 0-11.343.5-17 5.17-4.5 10.33-9 15.5-13.5 43.03-1.766 86.03-1.266 129 1.5a64.385 64.385 0 00-7 6.5c44.67.5 89.33.667 134 .5z"
                    fill="#007BFE"
                />
                <Path
                    opacity={0.978}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3897.78 367a593.99 593.99 0 01-28 30 2085.886 2085.886 0 00-223-5v-33c83.82-1.706 167.48.961 251 8z"
                    fill="#007BFE"
                />
                <Path
                    opacity={0.993}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3360.78 98h108v151a3817.888 3817.888 0 00-108 12V98z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.975}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3463.78 268h5v33a2056.075 2056.075 0 00-108 12v-33c34.46-4.161 68.79-8.161 103-12z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.973}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3470.78 319h153v22a2830.184 2830.184 0 00-263 22v-31c36.75-4.786 73.42-9.12 110-13z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.969}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3612.78 360h11v32a2842.265 2842.265 0 00-168 11.5l-45 1c-4.67 6-9.33 12-14 18-4.33.667-8.67.667-13 0a149.767 149.767 0 008-18.5h-31v-22a3100.126 3100.126 0 01252-22z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.99}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2459.78 99h231v86c-64-.667-128-1-192-1v120a4126.134 4126.134 0 01-104-11c-.17-43.668 0-87.335.5-131 3.9-39.066 25.4-60.066 64.5-63z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.974}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2394.78 312a3274.985 3274.985 0 00294 23.5c1.96 10.577 2.63 21.41 2 32.5a2990.898 2990.898 0 01-295-23.5 268.365 268.365 0 01-1-32.5z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.965}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2483.78 405a936.674 936.674 0 00-51-6c-17.18-5.683-28.52-17.183-34-34.5a3271.368 3271.368 0 00292 22.5v18h-207z"
                    fill="#017BFF"
                />
                <Path
                    opacity={0.929}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3032.78 98h104v198a2477.433 2477.433 0 01-104 11V98z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.93}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3238.78 98h104v166a2111.348 2111.348 0 00-104 17V98z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.908}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3336.78 283h6c.32 10.915-.01 21.748-1 32.5a6887.874 6887.874 0 01-188 30 3143.871 3143.871 0 01-120 13.5 302.562 302.562 0 01-1-33c34.75-2.875 69.42-6.542 104-11v4h102v-19c32.79-5.695 65.46-11.362 98-17z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.913}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3335.78 335h7c.32 9.717-.18 19.384-1.5 29a2951.596 2951.596 0 01-261 41c-18.12-2.472-31.62-11.639-40.5-27.5a3195.022 3195.022 0 00296-42.5z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.811}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3322.78 387c2.36-.163 4.69.003 7 .5-9.42 9.375-20.75 15.041-34 17a710.685 710.685 0 01-73 1c33.37-6.282 66.7-12.449 100-18.5z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.989}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2699.78 99h104v113h107V99h104v210a2618.362 2618.362 0 01-105 6v-32h-106v35c-34.67.099-69.34-.234-104-1V99z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.964}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3005.78 328h9v33a4922.285 4922.285 0 01-105 6v-33c32.22-.93 64.22-2.93 96-6zM2699.78 336c34.66.778 69.33 1.111 104 1v33c-34.67-.118-69.34-.452-104-1v-33z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.949}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3001.78 380h13v25h-105v-19a1569.56 1569.56 0 0092-6z"
                    fill="#007AFF"
                />
                <Path
                    opacity={0.944}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2699.78 388c34.66.548 69.33.882 104 1v16h-104v-17z"
                    fill="#007AFF"
                />
                <Path
                    d="M2130.64 98.085c-12.11.751-23.14 4.779-32.67 11.938-11.04 8.286-18.9 20.121-22.18 33.408-.78 3.157-1.27 6.101-1.64 9.864-.07.811-.11 10.129-.13 39.304-.02 37.426-.02 38.246.14 38.288.13.026.17.154.21.623.11 1.05.47 3.371.75 4.787.2 1.058.29 1.391.41 1.425.07.026 2.07.47 4.44.99 97.16 21.41 193.4 38.212 291.55 50.892 5.5.717 15.1 1.92 15.48 1.946l.35.025.04-6.997c.03-4.164.1-7.893.17-9.199.23-4.335-.17-9.42-1.12-14.097-1.07-5.307-2.65-9.898-5.11-14.847-4.65-9.387-11.71-17.391-20.47-23.228-8.56-5.7-17.96-8.951-28.44-9.838-2.02-.171-2.51-.171-79.47-.171h-77.45V179.065h187.32V98h-111.01c-110.96 0-111.02 0-111.02.17 0 .214-.08.214-1.92.043-1.66-.153-6.54-.23-8.23-.128zM2086.54 261.462c0 .051 1.66 2.057 2.5 3.012 5.36 6.093 12.26 11.247 19.63 14.677 6.28 2.91 12.57 4.6 20.01 5.359 1.29.137 4.36.145 38.64.162 20.48.009 37.17 0 37.1-.017-.07-.017-2.06-.375-4.43-.802-34.31-6.152-80.25-15.223-112.49-22.212-.53-.111-.96-.196-.96-.179zM2285.88 308.557v10.282l-33.2.017-33.2.026 3.79.665c45.65 8.056 88.9 14.771 133.62 20.753 11.68 1.562 29.76 3.883 30.27 3.883h.23l-.02-15.889-.02-15.889-3.93-.495c-32.48-4.113-63.28-8.405-93.19-13.004-2.28-.342-4.18-.632-4.24-.632-.08 0-.11 2.074-.11 10.283zM2074 328.9v10.052l.41.111c.22.068.42.136.44.17.06.086 15.55 3.482 27.77 6.102 85.54 18.32 171.96 33.296 258.28 44.756l4.51.597.52-.443c3-2.56 6.06-5.709 8.36-8.585 3.74-4.701 6.57-9.582 8.84-15.248l.75-1.878-.23-.059c-.12-.035-2.79-.393-5.94-.794-25.72-3.311-57.25-7.774-85.64-12.126-59.03-9.053-119.97-19.908-177.25-31.572l-5.63-1.144H2074V328.9zM2074 375.32v14.984l.88.197c1.29.273 35.12 6.783 60.85 11.707l9.4 1.792 83.19-.017c79.27-.026 83.15-.034 82.26-.171-.51-.085-3.78-.571-7.25-1.092-74.43-11.136-152.11-25.454-224.98-41.471-1.94-.427-3.72-.811-3.94-.845l-.41-.068v14.984z"
                    fill="#027BFE"
                />
            </Svg>
        </>
    );
};

export default LogoComponent;
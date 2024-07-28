import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Audio} from 'remotion';
import Subtitles from './Subtitles';
import AudioFade from './AudioFade';
import backgroundImage from '../static/bg.jpg'; // Ensure you have CleanShot.png in the same directory
import bgmusic from '../static/qfl.mp3';
import '../font.css';
const MyVideo = ({text}) => {
	return (
		<AbsoluteFill
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				fontFamily: 'Huiwen Mingchao'
			}}
		>
			<AudioFade
				src={bgmusic}
				startFrom={0}
				fadeInDuration={60} // 2秒淡入（假设fps为30）
				fadeOutDuration={90} // 3秒淡出
				audioDurationInFrames={9000} // 2分钟音频（假设fps为30）
			/>
			<div style={{
				 display: 'flex', 
				 justifyContent: 'center', 
				 alignItems: 'center' 
			}}>
				<Subtitles
					text={text}
					style={{
						width: '70%',
						fontSize: '80px', // 增大字体大小
						lineHeight: '1.5',
						color: 'black',
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};

export default MyVideo;

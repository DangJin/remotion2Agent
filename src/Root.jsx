import {Composition} from 'remotion';
import MyVideo from './components/MyVideo';
import bgmusic from './static/bgmusic_1.mp3'

export const RemotionRoot = () => {
	const width = 1920; // 示例宽度
	const height = 1080; // 示例高度


	return (
		<Composition
			id="MyVideo"
			component={MyVideo}
			durationInFrames={300} // 15 seconds at 30fps
			fps={30}
			width={height}
			height={width}
			defaultProps={{
				text: '于千万人之中，遇见你要遇见的人。于千万年之中，时间无涯的荒野里，没有早一步，也没有迟一步，遇上了也只能轻轻地说一句：‘哦，你也在这里吗？’',
			}}
		/>
	); 
};

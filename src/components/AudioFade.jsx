import React from 'react';
import { Audio, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

const AudioFade = ({ src, startFrom = 0, fadeInDuration = 30, fadeOutDuration = 30, audioDurationInFrames }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 确保音频持续时间有效
  const actualAudioDuration = audioDurationInFrames || durationInFrames;
  
  // 计算淡出开始时间，确保它大于淡入结束时间
  const fadeOutStart = Math.max(
    startFrom + fadeInDuration + 1,
    actualAudioDuration - fadeOutDuration
  );

  // 计算音量
  const volume = interpolate(
    frame,
    // 输入范围
    [
      startFrom,
      startFrom + fadeInDuration,
      fadeOutStart,
      Math.min(fadeOutStart + fadeOutDuration, actualAudioDuration)
    ],
    // 输出范围（音量从0到1再到0）
    [0, 1, 1, 0],
    {
      // 确保音量值不会超出0-1范围
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );

  return (
    <Audio
      src={src}
      startFrom={startFrom}
      endAt={actualAudioDuration}
      volume={volume}
    />
  );
};

export default AudioFade;
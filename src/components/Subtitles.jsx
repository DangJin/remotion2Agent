import React from 'react';
import { useCurrentFrame, spring, interpolate } from 'remotion';

const getVisualLength = (str) => {
  return str.split('').reduce((acc, char) => {
    if (/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/.test(char)) {
      // 中文字符和全角标点
      return acc + 2;
    } else {
      // 其他字符（包括英文、数字、半角标点等）
      return acc + 1;
    }
  }, 0);
};

const isPunctuation = (char) => {
  // 匹配中文标点和英文标点
  return /[，。！？：,.!?:]/u.test(char);
};

const processText = (text, maxLength = 40) => {
  const lines = [];
  let currentLine = '';
  let currentLength = 0;

  for (const char of text) {
    const charLength = getVisualLength(char);

    if (isPunctuation(char)) {
      // 如果是标点符号，添加到当前行并换行
      if (currentLine) {
        lines.push(currentLine + char);
        currentLine = '';
        currentLength = 0;
      } else {
        // 如果当前行为空（上一个字符就是标点），直接添加这个标点
        lines.push(char);
      }
    } else if (currentLength + charLength > maxLength) {
      // 如果加上这个字符会超过最大长度，换行
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = char;
      currentLength = charLength;
    } else {
      // 正常添加字符
      currentLine += char;
      currentLength += charLength;
    }
  }

  // 添加最后一行（如果有的话）
  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const Subtitles = ({ text = '', style, maxLineLength = 40 }) => {
  const frame = useCurrentFrame();
  const textArray = processText(text, maxLineLength);
  
  const animations = textArray.map((line, index) => {
    const delay = index * 40; // 每行字幕的延迟时间
    const animatedValue = spring({
      frame: frame - delay,
      fps: 30,
      config: {
        damping: 10,
        stiffness: 100,
      },
    });

    const opacity = interpolate(animatedValue, [0, 1], [0, 1]);
    const transform = interpolate(animatedValue, [0, 1], [20, 0]);

    return { opacity, transform };
  });

  return (
    <div style={style}>
      {textArray.map((line, index) => (
        <p 
          key={index} 
          style={{ 
            margin: 0, 
            opacity: animations[index].opacity, 
            transform: `translateY(${animations[index].transform}px)` 
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default Subtitles;
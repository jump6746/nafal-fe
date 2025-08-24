import React from 'react';

/**
 * 텍스트에서 마침표가 나올 때마다 줄바꿈을 추가하는 함수
 * 마지막 마침표와 숫자 옆의 마침표는 제외하고 줄바꿈을 적용합니다.
 * @param text - 원본 텍스트
 * @returns 줄바꿈이 적용된 텍스트
 */
export const formatTextWithLineBreaks = (text: string): string => {
  if (!text) return '';

  // 숫자 옆의 마침표는 임시로 다른 문자로 치환
  const tempText = text.replace(/(\d+)\.(\d+)/g, '$1@DOT@$2');

  // 마침표로 텍스트를 분할
  const sentences = tempText.split('.');

  // 마지막 요소가 빈 문자열이면 제거
  if (sentences[sentences.length - 1].trim() === '') {
    sentences.pop();
  }

  // 마지막 문장을 제외하고 마침표와 줄바꿈 추가
  const formattedSentences = sentences.map((sentence, index) => {
    const trimmedSentence = sentence.trim();
    if (index === sentences.length - 1) {
      // 마지막 문장은 마침표만 추가
      return trimmedSentence + '.';
    } else {
      // 중간 문장들은 마침표와 줄바꿈 추가
      return trimmedSentence + '.\n';
    }
  });

  // 임시 문자를 다시 마침표로 복원
  return formattedSentences.join('').replace(/@DOT@/g, '.');
};

/**
 * React에서 줄바꿈을 렌더링하기 위한 함수
 * @param text - 줄바꿈이 포함된 텍스트
 * @returns 줄바꿈이 적용된 JSX 요소들
 */
export const renderTextWithLineBreaks = (text: string): React.ReactElement | null => {
  if (!text) return null;

  const formattedText = formatTextWithLineBreaks(text);
  const lines = formattedText.split('\n');

  return React.createElement(
    'div',
    {},
    lines.map((line, index) =>
      React.createElement(
        'span',
        { key: index },
        line,
        index < lines.length - 1 && React.createElement('br', { key: `br-${index}` })
      )
    )
  );
};

// 한국어 날짜 형식으로 변환하는 유틸리티 함수
export const formatKoreanDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return dateString; // 유효하지 않은 경우 원본 문자열 반환
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 오전/오후 구분
    const ampm = hours < 12 ? '오전' : '오후';
    const displayHours = hours < 12 ? hours : hours - 12;
    const displayHours12 = displayHours === 0 ? 12 : displayHours;

    return `${year}. ${month}. ${day}. ${ampm} ${displayHours12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } catch {
    return dateString; // 에러 발생 시 원본 문자열 반환
  }
};

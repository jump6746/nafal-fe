// 카카오 주소검색 API 관련 타입 정의
export interface KakaoAddressData {
  zonecode: string; // 우편번호
  address: string; // 주소
  addressEnglish: string; // 영문주소
  addressType: 'R' | 'J'; // 주소타입 (R: 도로명, J: 지번)
  userSelectedType: 'R' | 'J'; // 사용자가 선택한 주소타입
  noSelected: 'Y' | 'N'; // 검색결과에서 선택된 결과가 없을때
  userLanguageType: 'K' | 'E'; // 검색 언어타입
  roadAddress: string; // 도로명주소
  roadAddressEnglish: string; // 영문 도로명주소
  jibunAddress: string; // 지번주소
  jibunAddressEnglish: string; // 영문 지번주소
  autoRoadAddress: string; // 자동완성 도로명주소
  autoRoadAddressEnglish: string; // 영문 자동완성 도로명주소
  autoJibunAddress: string; // 자동완성 지번주소
  autoJibunAddressEnglish: string; // 영문 자동완성 지번주소
  buildingCode: string; // 건물관리번호
  buildingName: string; // 건물명
  apartment: 'Y' | 'N'; // 공동주택여부
  sido: string; // 시도
  sigungu: string; // 시군구
  sigunguCode: string; // 시군구코드
  roadnameCode: string; // 도로명코드
  bcode: string; // 법정동/법정리코드
  roadname: string; // 도로명
  bname: string; // 법정동/법정리명
  bname1: string; // 법정리의 읍/면 이름
  bname2: string; // 법정동/법정리명
  hname: string; // 행정동명
  query: string; // 검색어
}

// 다음 포스트코드 관련 전역 타입
declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: KakaoAddressData) => void;
        onclose?: (state: 'FORCE_CLOSE' | 'COMPLETE_CLOSE') => void;
        onresize?: (size: { width: number; height: number }) => void;
        width?: string | number;
        height?: string | number;
        animation?: boolean;
        focusInput?: boolean;
        autoMapping?: boolean;
        shorthand?: boolean;
        pleaseReadGuide?: number;
        pleaseReadGuideTimer?: number;
        maxSuggestItems?: number;
        showMoreHName?: boolean;
        hideMapBtn?: boolean;
        hideEngBtn?: boolean;
        alwaysShowEngAddr?: boolean;
        zonecodeOnly?: boolean;
        theme?: {
          bgColor?: string;
          searchBgColor?: string;
          contentBgColor?: string;
          pageBgColor?: string;
          textColor?: string;
          queryTextColor?: string;
          postcodeTextColor?: string;
          emphTextColor?: string;
          outlineColor?: string;
        };
      }) => {
        open: () => void;
        embed: (element: HTMLElement | null) => void;
      };
    };
  }
}

// 배송지 정보 인터페이스
export interface DeliveryAddress {
  recipientName: string; // 받는 사람 이름
  recipientPhone: string; // 받는 사람 전화번호
  zipcode: string; // 우편번호
  address: string; // 기본 주소
  detailAddress: string; // 상세 주소
  isDefault?: boolean; // 기본 배송지 여부
  shippingMethod: '일반 택배' | '방문 픽업' | '로켓 배송';
}

// 순수 함수로 변경 - 네비게이션 로직은 컴포넌트에서 처리
const AuthCheck = () => {
  const sessionData = sessionStorage.getItem('nefal-access');

  if (!sessionData) {
    console.log('세션스토리지에 nefal-access 데이터가 없습니다.');
    return { success: false, reason: 'no_session_data' };
  }

  try {
    const accessToken = JSON.parse(sessionData);

    // 모든 필드 체크
    const requiredFields = {
      userId: accessToken?.userId,
      username: accessToken?.username,
      nickname: accessToken?.nickname,
      cardRegistered: accessToken?.cardRegistered,
      balance: accessToken?.balance,
      identityVerified: accessToken?.identityVerified,
      accessToken: accessToken?.accessToken,
    };

    console.log('세션스토리지 데이터:', requiredFields);

    // 필수 필드 체크 (userId, username, nickname, accessToken은 필수)
    const criticalFields = ['userId', 'username', 'nickname', 'accessToken'];
    const missingCriticalFields = criticalFields.filter(
      field =>
        accessToken[field] === null || accessToken[field] === undefined || accessToken[field] === ''
    );

    if (missingCriticalFields.length > 0) {
      console.log('누락된 필수 필드:', missingCriticalFields);
      return { success: false, reason: 'missing_critical_fields' };
    }

    // balance는 null일 수 있으므로 별도 체크
    if (accessToken.balance === null) {
      console.log('balance가 null입니다 (정상적인 경우일 수 있음)');
    }

    console.log('모든 인증 정보가 유효합니다.');
    return { success: true, data: accessToken };
  } catch (error) {
    console.error('세션스토리지 데이터 파싱 오류:', error);
    return { success: false, reason: 'parse_error' };
  }
};

export default AuthCheck;

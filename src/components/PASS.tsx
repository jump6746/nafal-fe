const PASS = () => {
  return (
    <div className="flex flex-col bg-white w-fit">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white p-4">
        <h1 className="flex justify-center">
          <a href="#" className="inline-block">
            <img src="/images/PASS/kt_pass_banner_pc_20230926.png" alt="PASS" className="h-8" />
          </a>
        </h1>
      </header>

      {/* Main Content */}
      <section className="mx-auto w-full max-w-md flex-1 p-4">
        <form name="authForm" method="post" autoComplete="off" className="w-full">
          <fieldset className="mb-6">
            <p className="mb-4 text-center text-xl font-bold text-gray-700">
              이용중이신 통신사를 선택해주세요.
            </p>
            <legend className="sr-only">통신사 선택</legend>

            {/* 통신사 선택 버튼 */}
            <ul className="mb-6 grid grid-cols-2 place-items-center gap-2">
              {/* SKT */}
              <li>
                <button
                  type="button"
                  id="agency-skt"
                  value="01"
                  className="h-40 w-40 rounded-full border-3 border-red-500"
                >
                  <span className="mx-auto block">
                    <img
                      src="/images/PASS/logo_sk.png"
                      alt="SK telecom 선택"
                      className="mx-auto h-8"
                    />
                  </span>
                </button>
              </li>

              {/* KT */}
              <li>
                <button
                  type="button"
                  id="agency-kt"
                  value="02"
                  className="h-40 w-40 rounded-full border-2 border-gray-300"
                >
                  <span className="mx-auto block">
                    <img
                      src="/images/PASS/logo_kt_gray.png"
                      alt="kt 선택안됨"
                      className="mx-auto h-8"
                    />
                  </span>
                </button>
              </li>

              {/* LG U+ */}
              <li>
                <button
                  type="button"
                  id="agency-lgu"
                  value="03"
                  className="h-40 w-40 rounded-full border-2 border-gray-300"
                >
                  <span className="mx-auto block">
                    <img
                      src="/images/PASS/logo_lgu_gray.png"
                      alt="LG U+ 선택안됨"
                      className="mx-auto h-8"
                    />
                  </span>
                </button>
              </li>

              {/* 알뜰폰 */}
              <li>
                <button
                  type="button"
                  id="agency-and"
                  value="55"
                  className="h-40 w-40 rounded-full border-2 border-gray-300"
                >
                  <span className="mx-auto block">
                    <img
                      src="/images/PASS/logo_and_gray.png"
                      alt="알뜰폰 선택안됨"
                      className="mx-auto h-8"
                    />
                  </span>
                </button>
              </li>
            </ul>

            {/* 전체 동의 */}
            <ul className="mb-2 border-t border-b border-gray-200 py-3">
              <li>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="agree"
                    id="agree_all"
                    className="mr-2 h-5 w-5"
                    checked={true}
                  />
                  <label htmlFor="agree_all" className="text-lg font-bold text-gray-800">
                    전체 동의하기
                  </label>
                </div>
              </li>
            </ul>

            {/* 필수 항목 */}
            <ul className="mb-6 grid grid-cols-2 gap-2">
              <li>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agree1"
                      id="agree1"
                      value="Y"
                      className="mr-2 h-5 w-5"
                      checked={true}
                    />
                    <label htmlFor="agree1" className="text-sm text-gray-800">
                      개인정보이용동의
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agree2"
                      id="agree2"
                      value="Y"
                      className="mr-2 h-5 w-5"
                      checked={true}
                    />
                    <label htmlFor="agree2" className="text-sm text-gray-800">
                      고유식별정보처리동의
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agree3"
                      id="agree3"
                      value="Y"
                      className="mr-2 h-5 w-5"
                      checked={true}
                    />
                    <label htmlFor="agree3" className="text-sm text-gray-800">
                      서비스이용약관동의
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agree4"
                      id="agree4"
                      value="Y"
                      className="mr-2 h-5 w-5"
                      checked={true}
                    />
                    <label htmlFor="agree4" className="text-sm text-gray-800">
                      통신사이용약관동의
                    </label>
                  </div>
                </div>
              </li>
              <li id="mvnoAgree" hidden>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="agree5"
                      id="agree5"
                      value="Y"
                      className="mr-2 h-5 w-5"
                    />
                    <label htmlFor="agree5" className="text-sm text-gray-800">
                      제3자 정보제공 동의
                    </label>
                  </div>
                  <button type="button" className="text-sm text-blue-600">
                    보기
                  </button>
                </div>
              </li>
            </ul>

            {/* 버튼 영역 */}
            <div className="space-y-2">
              <button
                type="button"
                id="btnPass"
                className="w-full rounded bg-red-500 py-3 font-bold text-white"
              >
                PASS로 인증하기
              </button>
            </div>
          </fieldset>
        </form>
      </section>
    </div>
  );
};

export default PASS;
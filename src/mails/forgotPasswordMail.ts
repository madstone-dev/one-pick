import jwt from "jsonwebtoken";

export const forgotPasswordMail = async (userId: number, email: string) => {
  const appName = "One Pick!";
  const domain =
    process.env.NODE_ENV === "production"
      ? "https://www.onepick.fun/"
      : "http://localhost:3000/";
  let resetToken = "";
  resetToken = await jwt.sign(
    { id: userId },
    process.env.SERVER_KEY as string,
    {
      expiresIn: "1h",
    }
  );

  return `
<div
  style="
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    background-color: #ffffff;
    color: #718096;
    height: 100%;
    line-height: 1.4;
    margin: 0;
    padding: 0;
    width: 100% !important;
  "
>
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol';
      background-color: #edf2f7;
      margin: 0;
      padding: 0;
      width: 100%;
    "
  >
    <tbody>
      <tr>
        <td
          align="center"
          style="
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Helvetica, Arial, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol';
          "
        >
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
              box-sizing: border-box;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                'Segoe UI Emoji', 'Segoe UI Symbol';
              margin: 0;
              padding: 0;
              width: 100%;
            "
          >
            <tbody>
              <tr>
                <td
                  style="
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                      Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                      'Segoe UI Emoji', 'Segoe UI Symbol';
                    padding: 25px 0;
                    text-align: center;
                  "
                >
                  <a
                    href="${domain}"
                    style="
                      box-sizing: border-box;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        Roboto, Helvetica, Arial, sans-serif,
                        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                      color: #3d4852;
                      font-size: 19px;
                      font-weight: bold;
                      text-decoration: none;
                      display: inline-block;
                    "
                    target="_blank"
                  >
                    ${appName}
                  </a>
                </td>
              </tr>

              <tr>
                <td
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                      Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                      'Segoe UI Emoji', 'Segoe UI Symbol';
                    background-color: #edf2f7;
                    border-bottom: 1px solid #edf2f7;
                    border-top: 1px solid #edf2f7;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                  "
                >
                  <table
                    align="center"
                    width="570"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      box-sizing: border-box;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        Roboto, Helvetica, Arial, sans-serif,
                        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                      background-color: #ffffff;
                      border-color: #e8e5ef;
                      border-radius: 2px;
                      border-width: 1px;
                      margin: 0 auto;
                      padding: 0;
                      width: 570px;
                    "
                  >
                    <tbody>
                      <tr>
                        <td
                          style="
                            box-sizing: border-box;
                            font-family: -apple-system, BlinkMacSystemFont,
                              'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                              'Apple Color Emoji', 'Segoe UI Emoji',
                              'Segoe UI Symbol';
                            max-width: 100vw;
                            padding: 32px;
                          "
                        >
                          <h1
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              color: #3d4852;
                              font-size: 18px;
                              font-weight: bold;
                              margin-top: 0;
                              text-align: left;
                            "
                          >
                            비밀번호 재설정 링크가 도착했습니다!
                          </h1>
                          <p
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              font-size: 16px;
                              line-height: 1.5em;
                              margin-top: 0;
                              text-align: left;
                            "
                          >
                            계정에 대한 비밀번호 재설정 요청이 접수되었기 때문에 이 이메일이 발송되었습니다.
                          </p>
                          <table
                            align="center"
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              margin: 30px auto;
                              padding: 0;
                              text-align: center;
                              width: 100%;
                            "
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  style="
                                    box-sizing: border-box;
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Helvetica, Arial, sans-serif,
                                      'Apple Color Emoji', 'Segoe UI Emoji',
                                      'Segoe UI Symbol';
                                  "
                                >
                                  <table
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="
                                      box-sizing: border-box;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Helvetica, Arial, sans-serif,
                                        'Apple Color Emoji', 'Segoe UI Emoji',
                                        'Segoe UI Symbol';
                                    "
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            box-sizing: border-box;
                                            font-family: -apple-system,
                                              BlinkMacSystemFont, 'Segoe UI',
                                              Roboto, Helvetica, Arial,
                                              sans-serif, 'Apple Color Emoji',
                                              'Segoe UI Emoji',
                                              'Segoe UI Symbol';
                                          "
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              box-sizing: border-box;
                                              font-family: -apple-system,
                                                BlinkMacSystemFont, 'Segoe UI',
                                                Roboto, Helvetica, Arial,
                                                sans-serif, 'Apple Color Emoji',
                                                'Segoe UI Emoji',
                                                'Segoe UI Symbol';
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td
                                                  style="
                                                    box-sizing: border-box;
                                                    font-family: -apple-system,
                                                      BlinkMacSystemFont,
                                                      'Segoe UI', Roboto,
                                                      Helvetica, Arial,
                                                      sans-serif,
                                                      'Apple Color Emoji',
                                                      'Segoe UI Emoji',
                                                      'Segoe UI Symbol';
                                                  "
                                                >
                                                  <a
                                                    href="${domain}reset-password?token=${resetToken}&email=${email}"
                                                    rel="noopener"
                                                    style="
                                                      box-sizing: border-box;
                                                      font-family: -apple-system,
                                                        BlinkMacSystemFont,
                                                        'Segoe UI', Roboto,
                                                        Helvetica, Arial,
                                                        sans-serif,
                                                        'Apple Color Emoji',
                                                        'Segoe UI Emoji',
                                                        'Segoe UI Symbol';
                                                      border-radius: 4px;
                                                      color: #fff;
                                                      display: inline-block;
                                                      overflow: hidden;
                                                      text-decoration: none;
                                                      background-color: #6366f1;
                                                      border-bottom: 8px solid
                                                        #6366f1;
                                                      border-left: 18px solid
                                                        #6366f1;
                                                      border-right: 18px solid
                                                        #6366f1;
                                                      border-top: 8px solid
                                                        #6366f1;
                                                    "
                                                    target="_blank"
                                                    >비밀번호 재설정</a
                                                  >
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              font-size: 16px;
                              line-height: 1.5em;
                              margin-top: 0;
                              text-align: left;
                            "
                          >
                            이 비밀번호 재설정 링크는 60분 후에 만료됩니다.
                          </p>
                          <p
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              font-size: 16px;
                              line-height: 1.5em;
                              margin-top: 0;
                              text-align: left;
                            "
                          >
                            만약 비밀번호 재설정 요청을 직접 한 것이 아니라면, 추가 조치가 필요하지 않습니다.
                          </p>
                          <p
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              font-size: 16px;
                              line-height: 1.5em;
                              margin-top: 0;
                              text-align: left;
                            "
                          >
                            감사합니다.
                          </p>

                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              border-top: 1px solid #e8e5ef;
                              margin-top: 25px;
                              padding-top: 25px;
                            "
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    box-sizing: border-box;
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Helvetica, Arial, sans-serif,
                                      'Apple Color Emoji', 'Segoe UI Emoji',
                                      'Segoe UI Symbol';
                                  "
                                >
                                  <p
                                    style="
                                      box-sizing: border-box;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI', Roboto,
                                        Helvetica, Arial, sans-serif,
                                        'Apple Color Emoji', 'Segoe UI Emoji',
                                        'Segoe UI Symbol';
                                      line-height: 1.5em;
                                      margin-top: 0;
                                      text-align: left;
                                      font-size: 14px;
                                    "
                                  >
                                    "비밀번호 재설정" 버튼을 클릭하는 데 문제가 있는 경우 아래 URL을 복사하여 웹 브라우저에 붙여넣으세요: 
                                    <span
                                      style="
                                        box-sizing: border-box;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Helvetica, Arial, sans-serif,
                                          'Apple Color Emoji', 'Segoe UI Emoji',
                                          'Segoe UI Symbol';
                                        word-break: break-all;
                                      "
                                      ><a
                                        href="${domain}reset-password?token=${resetToken}&email=${email}"
                                        style="
                                          box-sizing: border-box;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI',
                                            Roboto, Helvetica, Arial, sans-serif,
                                            'Apple Color Emoji',
                                            'Segoe UI Emoji', 'Segoe UI Symbol';
                                          color: #3869d4;
                                        "
                                        target="_blank"
                                        >${domain}reset-password?token=${resetToken}&email=${email}</a
                                      ></span
                                    >
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr>
                <td
                  style="
                    box-sizing: border-box;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                      Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                      'Segoe UI Emoji', 'Segoe UI Symbol';
                  "
                >
                  <table
                    align="center"
                    width="570"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="
                      box-sizing: border-box;
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        Roboto, Helvetica, Arial, sans-serif,
                        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                      margin: 0 auto;
                      padding: 0;
                      text-align: center;
                      width: 570px;
                    "
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            box-sizing: border-box;
                            font-family: -apple-system, BlinkMacSystemFont,
                              'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                              'Apple Color Emoji', 'Segoe UI Emoji',
                              'Segoe UI Symbol';
                            max-width: 100vw;
                            padding: 32px;
                          "
                        >
                          <p
                            style="
                              box-sizing: border-box;
                              font-family: -apple-system, BlinkMacSystemFont,
                                'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                'Apple Color Emoji', 'Segoe UI Emoji',
                                'Segoe UI Symbol';
                              line-height: 1.5em;
                              margin-top: 0;
                              color: #b0adc5;
                              font-size: 12px;
                              text-align: center;
                            "
                          >
                            © OnePick. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;
};

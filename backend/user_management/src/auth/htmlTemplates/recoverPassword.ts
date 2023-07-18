export default function recoverPassword(user, resetPasswordToken) {
    const link = process.env.FRONT_WEBSITE + '/reset/' + resetPasswordToken;
    return (
        `<p>Bonjour ${user.fullName},</p>\n` +
        '                        <p>\n' +
        "                         Quelqu'un a demandé un nouveau mot de passe pour votre compte karhabtek.\n" +
        '                        </p>\n' +
        '                        <p>\n' +
        "                          Si vous n'avez pas fait cette demande, vous pouvez ignorer cet e-mail en toute sécurité :)\n" +
        '                        </p>\n' +
        '                        <table\n' +
        '                          role="presentation"\n' +
        '                          border="0"\n' +
        '                          cellpadding="0"\n' +
        '                          cellspacing="0"\n' +
        '                          class="btn btn-primary"\n' +
        '                        >\n' +
        '                          <tbody>\n' +
        '                            <tr>\n' +
        '                              <td align="left">\n' +
        '                                <table\n' +
        '                                  role="presentation"\n' +
        '                                  border="0"\n' +
        '                                  cellpadding="0"\n' +
        '                                  cellspacing="0"\n' +
        '                                >\n' +
        '                                  <tbody>\n' +
        '                                    <tr>\n' +
        '                                      <td>\n' +
        '                                        <a\n' +
        `                                          href=${link}\n` +
        '                                          target="_blank"\n' +
        '                                          >Réinitialiser mot de passe</a\n' +
        '                                        >\n' +
        '                                      </td>\n' +
        '                                    </tr>\n' +
        '                                  </tbody>\n' +
        '                                </table>\n' +
        '                              </td>\n' +
        '                            </tr>\n' +
        '                          </tbody>\n' +
        '                        </table>'

    )
}

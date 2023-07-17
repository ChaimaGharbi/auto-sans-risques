export default function verifyEmail(user, tokenMail) {
    const link = process.env.SERVER_URL + '/auth/verify/' + tokenMail;
    return (
        `<p>Bonjour ${user},</p>\n` +
        '                        <p>\n' +
        "                         Merci d'avoir créé un compte!\n" +
        '                        </p>\n' +
        '                        <p>\n' +
        '                          Nous vous envoyons cet e-mail, car vous venez de vous inscrire dans notre site Karhabtek et nous devons vérifier votre adresse e-mail:)\n' +
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
        '                                          >Vérifier Email</a\n' +
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

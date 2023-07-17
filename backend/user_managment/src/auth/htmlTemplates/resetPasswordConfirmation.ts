export default function resetPasswordConfirmation(user) {
    return (
        `<p>Bonjour ${user},</p>\n` +
        '                        <p>\n' +
        '                          Ceci est une confirmation que le mot de passe de votre compte a été changé. :)\n' +
        '                        </p>\n' +
        '                        <table\n' +
        '                          role="presentation"\n' +
        '                          border="0"\n' +
        '                          cellpadding="0"\n' +
        '                          cellspacing="0"\n' +
        '                          class="btn btn-primary"\n' +
        '                        >\n' +
        '                        </table>'
    )
}

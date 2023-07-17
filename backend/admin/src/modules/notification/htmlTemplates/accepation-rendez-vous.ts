import moment = require('moment');

export default function acceptationRendezVous(expert, client, date) {
    return (
        `<p>Monsieur  ${client},</p>\n` +
        '                        <p>\n' +
        `                          L'expert ${
            expert
        } a accepté votre rendez-vous, veuillez être  à l'heure de votre RDV ${moment(date).format(
            'dddd DD MMMM YYYY à HH:mm'
        )}` +
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

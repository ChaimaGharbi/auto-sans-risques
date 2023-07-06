export default function refusRendezVous(expert, client) {
    return (
        `<p>Monsieur  ${client},</p>\n` +
        '                        <p>\n' +
        `                          L'expert ${expert} n'est pas disponible pour le moment, merci de changer la date de reservation ou demander la disponibilité d'un autre expert.` +
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

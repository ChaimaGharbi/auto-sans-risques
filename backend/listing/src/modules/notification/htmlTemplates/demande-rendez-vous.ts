import moment = require('moment');

export default function demandeRendezVous(expert, client, reservation) {
    return (
        `<p>Bonjour ${expert},</p>\n` +
        '                        <p>\n' +
        `                          Vous avez une demande de rendez-vous par le client ${
            client.fullName
        } le ${moment(reservation.date).format('dddd DD MMMM YYYY à HH:mm')} pour un diagnostic ${
            reservation.reason !== 'Avisvente' ? "d'Achat" : 'du Vente'
        } d'une voiture ${
            reservation.typeCar
        }.\n <p> S.V.P. bien vouloir répondre OUI pour confirmer votre présence ou NON si vous ne pouvez pas vous présenter.</p>` +
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

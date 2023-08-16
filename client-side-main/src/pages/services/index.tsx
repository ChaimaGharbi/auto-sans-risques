import Container from 'app/shared/components/Container'
import { useEffect } from 'react'

const ServicesPage = () => {
  useEffect(() => {
    const hash = window.location.hash // gets the hash portion of the URL, including the '#' character
    const hashParts = hash.split('#') // splits the hash string into an array based on the '#' character
    const lastPart = hashParts.pop() // gets the last element of the array, which represents the last part of the URL after the hash

    const element = document.getElementById(lastPart!)
    element?.scrollIntoView()
  }, [])
  return (
    <Container>
      <div className="py-20">
        <div className="text-center py-20">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl !m-0">
          Explorez nos services Auto Sans Risque
            <br className="hidden md:block" />
            
           
          </h1>
          <br className="hidden md:block" />
          <h2 className="text-primary text-xl sm:text-2xl md:text-4xl">
            Votre sérénité sur la route commence ici.
              
            </h2>

          <h4 className="!m-4 text-xs sm:text-base">
            Nous mettons à votre disposition nos savoir-faire et nos{' '}
            <br className="hidden md:block" />
            meilleurs experts pour réussir votre choix
          </h4>
        </div>

        <div
          id="diagnostique-achat"
          className="grid grid-cols-1 lg:grid-cols-2 py-4"
        >
          <div className="w-full h-full grid place-content-center lg:order-2 p-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
            Diagnostic d'Achat
            </h1>

            <p className="text-base max-w-lg">
              Soyez sûr de chaque décision que vous prenez lors de l'achat d'une
              voiture d'occasion. Notre service de diagnostic d'achat met à
              votre disposition l'expertise de nos professionnels de
              l'automobile. Nous examinons minutieusement chaque véhicule,
              fournissant un rapport détaillé sur son état actuel. Avec nos
              conseils avisés, évitez les surprises désagréables et investissez
              en toute confiance.
            </p>
          </div>
          <div className="w-full h-full grid place-content-center lg:order-1">
            <img src="/achat.png" alt="about" />
          </div>
        </div>

        <div
          id="certification-vehicule"
          className="grid grid-cols-1 lg:grid-cols-2 py-4"
        >
          <div className="w-full h-full grid place-content-center p-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
              Diagnostic de Vente
            </h1>

            <p className="text-xs sm:text-base max-w-lg">
              Vous envisagez de vendre votre voiture ? Connaître sa valeur
              réelle est essentiel pour obtenir le meilleur prix. Notre service
              de diagnostic de vente vous permet d'évaluer votre véhicule de
              manière précise. Mettez en avant ses atouts et fixez un prix
              compétitif sur le marché. Donnez aux acheteurs potentiels une
              raison de choisir votre voiture.
            </p>
          </div>
          <div className="w-full h-full grid place-content-center ">
            <img src="/vente.png" alt="about" />
          </div>
        </div>

        <div
          id="recommandation-vehicule"
          className="grid grid-cols-1 lg:grid-cols-2 py-4"
        >
          <div className="w-full h-full grid place-content-center lg:order-2 p-4">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
                Vente par Recommandation
              </h1>

            <p className="text-base max-w-lg">
              La recherche d'une voiture d'occasion peut être fastidieuse.
              Simplifiez ce processus avec notre service de vente par
              recommandation. Dites-nous vos critères, et nous vous proposerons
              une liste de voitures prévalidées. Gagnez du temps, évitez les
              tracas de la recherche et bénéficiez d'une expérience sans risque.
              Trouvez la voiture parfaite qui répond à vos besoins spécifiques.
            </p>
          </div>
          <div className="w-full h-full grid place-content-center lg:order-1">
            <img src="/recommandation.png" alt="about" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ServicesPage

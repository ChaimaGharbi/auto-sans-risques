import Container from 'app/shared/components/Container'
import Service from './components/Service'

const AboutPage = () => {
  return (
    <Container>
      <div className="py-20">
        <div className="grid grid-cols-1 py-10 my-10">
          <div className="w-full h-full grid place-content-center text-center ">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !m-0">
              Imaginez-vous acheter ou vendre une voiture sans le moindre souci.
             
            </h1>
            <br />
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary !m-0">
            C'est exactement ce que nous faisons possible avec nos
              services spécialisés.
            </h1>

            
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 py-10">
          <div className="w-full h-full grid place-content-center lg:order-2 p-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl !mb-4">
              <span className="text-primary pr-3">À Propos</span>
              <span>de Nous</span>
            </h1>

            <p className="text-base max-w-2xl">
              Bienvenue chez Auto Sans Risque, votre allié de confiance dans
              l'univers automobile. Nous sommes bien plus qu'une plateforme :
              nous sommes une passerelle vers des décisions éclairées et des
              expériences sans tracas lors de l'achat et de la vente de voitures
              d'occasion en Tunisie.
              <br />
              <br />
              Notre passion pour l'automobile et notre engagement envers
              l'excellence nous ont conduit à créer Auto Sans Risque. Avec une
              équipe d'experts en automobile et une technologie innovante à
              notre disposition, nous sommes là pour vous guider à chaque étape
              du processus, vous offrant une tranquillité d'esprit inestimable.
            </p>
          </div>
          <div className="w-full h-full grid place-content-center lg:order-1">
            {
              <iframe
                className="w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] md:w-[485px] md:h-[315px]"
                height="315"
                src="https://www.youtube.com/embed/Y4sZuy3FCpo"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            }
          </div>
        </div>

        <div className="py-10 text-center">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
            Nos Services
          </h1>
          <p className="text-xs sm:text-base  mx-auto">
            Trouver l'expert en qui vous pouvez faire confiance lors de l'achat
            ou de vente de votre véhicule.
          </p>

          <div className="flex items-top flex-wrap justify-evenly gap-10 py-10">
            <Service label="Diagnostic d'Achat" src="/sv1.png" />
            <Service label="Diagnostic de Vente" src="/sv2.png" />
            <Service label="Vente par Recommandation" src="/sv3.png" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AboutPage

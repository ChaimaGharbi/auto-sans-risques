import Container from 'app/shared/components/Container'
import Service from './components/Service'

const AboutPage = () => {
  return (
    <Container>
      <div className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 py-10">
          <div className="w-full h-full grid place-content-center text-center ">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !m-0">
              Vous achetez ou <br className="hidden md:block" /> vendez une
              voiture occasion?
            </h1>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-primary !m-0">
              Obtenez le meilleur conseil.
            </h1>

            <h4 className="!m-4 text-xs sm:text-base">
              Nous mettons à votre disposition nos savoir-faire et nos{' '}
              <br className="hidden md:block" />
              meilleurs experts pour réussir votre choix
            </h4>
          </div>
          <div className="w-full h-full grid place-content-center">
            <img src="/about-1.png" alt="about" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 py-10">
          <div className="w-full h-full grid place-content-center lg:order-2 p-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
              <span>À-PROPOS</span>
              <span className="text-primary px-3">AUTO SANS RISQUE</span>
            </h1>

            <p className="text-xs sm:text-base max-w-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="w-full h-full grid place-content-center lg:order-1">
            { <iframe
              className="w-[300px] h-[150px] sm:w-[400px] sm:h-[200px] md:w-[560px] md:h-[315px]"
              height="315"
              src="https://www.youtube.com/embed/ygTZZpVkmKg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
  ></iframe> }
          </div>
        </div>

        <div className="py-10 text-center">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
            NOS SERVICES
          </h1>
          <p className="text-xs sm:text-base max-w-lg mx-auto">
            Trouver des l'expert en qui vous pouvez faire confiance lors de
            l'achat ou de vente de votre véhicule.
          </p>

          <div className="flex items-top flex-wrap justify-evenly gap-10 py-10">
            <Service label="Diagnostique à l'achat" src="/sv1.png" />
            <Service label="Certification de votre véhicule" src="/sv2.png" />
            <Service label="Recommandation de véhicule" src="/sv3.png" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AboutPage

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
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !m-0">
            Trouvez la bonne voiture grâce au diagnostique de
            <br className="hidden md:block" />
            <span className="text-primary">
              Véhicule le plus fiable et le conseil le
              <br className="hidden md:block" />
              plus complet{' '}
            </span>{' '}
            En Tunisie !
          </h1>

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
              Diagnostique à l'achat
            </h1>

            <p className="text-xs sm:text-base max-w-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting,
            </p>
          </div>
          <div className="w-full h-full grid place-content-center lg:order-1">
            <img src="/s1.png" alt="about" />
          </div>
        </div>

        <div
          id="certification-vehicule"
          className="grid grid-cols-1 lg:grid-cols-2 py-4"
        >
          <div className="w-full h-full grid place-content-center p-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
              Certification de votre véhicule
            </h1>

            <p className="text-xs sm:text-base max-w-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting,
            </p>
          </div>
          <div className="w-full h-full grid place-content-center ">
            <img src="/s2.png" alt="about" />
          </div>
        </div>

        <div
          id="recommandation-vehicule"
          className="grid grid-cols-1 lg:grid-cols-2 py-4"
        >
          <div className="w-full h-full grid place-content-center lg:order-2 p-4">
            <a href="#test">
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl !my-4">
                Recommandation de véhicule
              </h1>
            </a>

            <p className="text-xs sm:text-base max-w-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting,
            </p>
          </div>
          <div className="w-full h-full grid place-content-center lg:order-1">
            <img src="/s3.png" alt="about" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ServicesPage

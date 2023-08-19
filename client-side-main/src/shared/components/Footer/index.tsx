import {
  FaFacebook as Facebook,
  FaLinkedin as LinkedIn,
  FaInstagram as Instagram,
  FaYoutube as Youtube,
} from 'react-icons/fa'
import Container from '../Container'
// TODO: Links to social media and contact info
const Footer = () => {
  return (
    <div className="bg-[#F1F3F7] font-rubik py-20">
      <Container>
        <div className="container mx-auto pt-8 pb-4">
          <div className=" px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4      overflow-hidden sm:-mx-1 md:-mx-px lg:-mx-2 xl:-mx-2 ">
            <div className=" w-full overflow-hidden flex flex-col sm:my-1 sm:px-1 md:my-px md:px-px lg:my-2 lg:px-2 xl:my-2 xl:px-2 pb-6">
              <h4 className="text-black font-bold">Entreprise</h4>
              <ul className="nav navbar-nav">
                <li id="navi-2" className="leading-7 text-sm">
                  <a className="text-gray-500 text-small" href="/about">
                    À propos de nous
                  </a>
                </li>
                <li id="navi-2" className="leading-7 text-sm">
                  <a className="text-gray-500 text-small" href="/contact">
                    Contact
                  </a>
                </li>
                <li id="navi-3" className="leading-7 text-sm">
                  <a className="text-gray-500 text-small" href="/page-2">
                    Partenaire
                  </a>
                </li>
                <li id="navi-3" className="leading-7 text-sm">
                  <a className="text-gray-500 text-small" href="/page-2">
                    Devenir un expert
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full overflow-hidden flex flex-col  sm:my-1 sm:px-1 md:my-px md:px-px  lg:my-2 lg:px-2 xl:my-2 xl:px-2 pb-6">
              <h4 className="text-black font-bold ">Nos servies</h4>
              <ul className="nav navbar-nav">
                <li id="navi-2" className="leading-7 text-sm">
                  <a
                    className="text-gray-500 text-small"
                    href="/services/#diagnostique-achat"
                  >
                    Diagnostic et accompagnement
                  </a>
                </li>
                <li id="navi-2" className="leading-7 text-sm">
                  <a
                    className="text-gray-500 text-small"
                    href="/services/#certification-vehicule"
                  >
                    Diagnostic et cértification
                  </a>
                </li>
                <li id="navi-3" className="leading-7 text-sm">
                  <a
                    className="text-gray-500 text-small"
                    href="/services/#recommandation-vehicule"
                  >
                    Service de recommandaion
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full overflow-hidden flex flex-col sm:my-1 sm:px-1 md:my-px md:px-px  lg:my-2 lg:px-2  xl:my-2 xl:px-2 pb-6">
              <h4 className="text-black font-bold">Politique</h4>
              <ul className="nav navbar-nav">
                <li id="navi-2" className="leading-7 text-sm">
                  <a className="text-gray-500 text-small" href="/cgu">
                    Mentions légales{' '}
                  </a>
                </li>
                <li id="navi-2" className="leading-7 text-sm">
                  <a className="text-gray-500 text-small" href="/cgu">
                    Politique de confidentialité
                  </a>
                </li>
                <li id="navi-3" className="leading-7 text-sm">
                  <a className="text-gray-500 text-small" href="/cgu">
                    CGU
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full overflow-hidden flex flex-col sm:my-1 sm:px-1 md:my-px md:px-px  lg:my-2 lg:px-2  xl:my-2 xl:px-2 pb-6">
              <h4 className="text-black font-bold">Suivez-nous</h4>
              <div className="flex items-center space-x-4 pt-3">
                <a
                  href="https://www.facebook.com/AutoSansRisque"
                  target="_blank"
                >
                  <Facebook fontSize={25} color="#6B7C93" />
                </a>
                <a
                  href="https://www.instagram.com/autosansrisque/"
                  target="_blank"
                >
                  <Instagram fontSize={25} color="#6B7C93" />
                </a>
                <Youtube fontSize={25} color="#6B7C93" />
                <a
                  href="https://www.linkedin.com/company/auto-sans-risque/about/"
                  target="_blank"
                >
                  <LinkedIn fontSize={25} color="#6B7C93" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer

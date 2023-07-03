import Container from 'app/shared/components/Container'
import { useArticle } from 'app/store/hooks'
import moment from 'moment'
import parse from 'html-react-parser'
import { FacebookShareButton } from 'react-share'
import { FaFacebook as FacebookIcon } from 'react-icons/fa'
import Breadcrumb from 'app/shared/components/Breadcrumb'
import { Helmet } from 'react-helmet-async'

const ArticlePage = () => {
  const article = useArticle()
  if (article.loading || !article.data) return <Container>Loading...</Container>
  console.log(window.location.href);
  

  return (
    <>
      <Helmet>
        <title>{article.data.title}</title>
        <meta name="description" content={article.data.content} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={article.data.title} />
        <meta property="og:description" content={article.data.content} />
        <meta property="og:image" content={article.data.articleImg} />
        <meta property="og:image:alt" content={article.data.title} />
      </Helmet>
      <Container>
        <div className="py-20 font-roboto">
          <Breadcrumb
            path={[
              { path: '', label: 'Accueil' },
              { path: 'article', label: 'Articles' },
              { path: article.data._id, label: article.data.title },
            ]}
          />
          <img
            src={article.data.articleImg}
            alt="cover"
            className="w-full h-80 object-cover object-top"
          />
          <h1 className="font-bold text-3xl pt-3">{article.data.title}</h1>
          <h3 className="text-[#B5B5B5] text-xs">
            Publié le {moment(article.data.created_At).format('D/M/Y')}
          </h3>

          <div className="font-medium">{parse(article.data.content)}</div>

          <FacebookShareButton
            title={article.data.title}
            quote={article.data.content}
            url={window.location.href}
            className="flex items-center gap-x-2 !bg-blue-500 hover:!bg-blue-700 !text-white !font-bold !py-2 !px-4 !rounded focus:!outline-none !duration-200"
          >
            <FacebookIcon className="text-lg" />
            <span>Partager sur Facebook</span>
          </FacebookShareButton>
        </div>
      </Container>
    </>
  )
}

export default ArticlePage

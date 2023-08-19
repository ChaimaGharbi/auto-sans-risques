import { Link } from 'react-router-dom'
import If from 'app/shared/components/If'
import { Spinner } from 'app/shared/components/Loading'
import SkeletonLoading from './SkeletonLoading'
import { Pagination } from 'antd'
import Paginate from 'app/shared/components/Paginate'
import { useBlog } from 'app/store/hooks'
import Container from 'app/shared/components/Container'
import { useEffect } from 'react'
const Blog = () => {
  // const { articles, categories, handleChangeCategory, pagination } =

  const { categories, handleSwitchGategory, articles, pagination } = useBlog()
  console.log(articles)

  return (
    <Container>
      <div className="text-2xl lg:text-4xl font-bold text-center py-5">
        Conseil et Actualité{' '}
      </div>
      <div className="font-rubik text-xl lg:text-2xl max-w-xl text-[#878DA4] text-center pb-10 mx-auto">
        Retrouvez l'ensemble de l'actualité et conseil automobile en continu
        classé par thématiques (nouveauté, futurs modèles, voitures d'exception,
        sport auto, entretien et conseil pratique).
      </div>
      <If test={articles.data?.length === 0}>
        <SkeletonLoading></SkeletonLoading>
      </If>
      <div className="text-center pb-5 flex justify-center flex-wrap">
        <If test={categories.loading}>
          <Spinner />
        </If>
        <If test={!categories.loading}>
          {categories.data &&
            categories.data.map(category => (
              <CategoryTag
                key={category._id}
                onClick={() => handleSwitchGategory(category._id)}
              >
                {category.category_name}
              </CategoryTag>
            ))}
        </If>
      </div>
      <If test={articles.loading}>
        <SkeletonLoading />
      </If>

      <If test={!articles.loading && articles.data}>
        <div className="px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {articles.data &&
            articles.data.map(article => (
              <Link
                key={article._id}
                to={`/article/${article._id}`}
                className="cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div className="overflow-hidden">
                  <img
                    className="w-full h-60 object-cover rounded-md "
                    src={article.articleImg}
                    alt=""
                  />
                  <div className="p-2 text-[#878DA4] flex items-center gap-x-3">
                    <span className="capitalize font-rubik">
                      {article.category[0].category_name}
                    </span>
                    <span className="">
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="2" cy="2" r="2" fill="#D8D8D8" />
                      </svg>
                    </span>
                    <span className="capitalize font-rubik">
                      {new Date(article.created_At).toLocaleDateString('fr', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="font-rubik p-2 font-semibold text-xl text-[#0F1C49] ">
                    {article.title}
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className="flex flex-row justify-center px-1 py-6 leading-normal text-gray-400 no-underline">
          <Pagination
            total={pagination.total}
            current={pagination.page}
            onChange={pagination.onChange}
            pageSize={pagination.pageSize}
          />
        </div>
      </If>
    </Container>
  )
}

const CategoryTag = props => (
  <button
    {...props}
    className="capitalize px-2 py-1 mx-1.5 text-[#09A4D8] bg-[#EBF8FC] rounded-md font-black font-rubik"
  />
)

export default Blog

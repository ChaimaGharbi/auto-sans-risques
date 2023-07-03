import { FormizStep } from '@formiz/core'
import Question from './Question'

export default function Section({ id, questions, title }) {
  return (
    <FormizStep name={title}>
      <div className="grid gap-4 divide-y">
        {questions.map((q, idx) => (
          <Question
            key={q._id}
            questionId={q._id}
            q={`${idx + 1} - ${q.question}`}
            choices={q.choices.filter(c => c.length > 0)}
            type={q.typeInput}
            categoryId={id}
            categoryName={title}
            {...q}
          />
        ))}
      </div>
    </FormizStep>
  )
}

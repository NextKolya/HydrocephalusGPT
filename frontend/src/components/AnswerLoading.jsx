import answerLoading from './styles/AnswerLoading.module.css';

export default function AnswerLoading() {
    return (
        <div className={answerLoading['loading-container']}>
            <span className={answerLoading['answer-loading']}>•</span>
            <span className={answerLoading['answer-loading']}>•</span>
            <span className={answerLoading['answer-loading']}>•</span>
        </div>
    );
}

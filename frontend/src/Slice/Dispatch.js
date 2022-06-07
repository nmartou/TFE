import { connect } from 'react-redux';

import { quizMethods } from './QuizSlice';

export const mapStateToProps = state => state;

export const mapDispatchToProps = dispatch => {
    return {
        ...quizMethods,
    }
};

export default { connect };
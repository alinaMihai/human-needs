export function interpretAnswers(answers) {
    function computeSum(questions) {
        return questions.reduce((sum, question) => {
            return sum + Number(answers[question])
        }, 0);
    }
    return {
        "Certainty": computeSum([3, 10, 13, 19, 24, 28, 33, 37, 45, 53, 63, 67, 73, 80]),
        "Uncertainty/Variety": computeSum([4, 5, 12, 16, 27, 31, 39, 47, 62, 68, 74, 78, 81, 83]),
        "Significance": computeSum([1, 9, 15, 23, 26, 34, 40, 48, 52, 56, 61, 69, 75, 82]),
        "Love/Connection": computeSum([2, 8, 17, 20, 25, 32, 38, 43, 49, 51, 60, 66, 71, 76]),
        "Growth": computeSum([6, 18, 21, 29, 35, 41, 46, 50, 54, 57, 59, 65, 70, 79]),
        "Contribution": computeSum([7, 11, 14, 22, 30, 36, 42, 44, 55, 58, 64, 72, 77, 84])
    }
}
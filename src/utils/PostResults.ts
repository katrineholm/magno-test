import { TestResults } from "../objects/TestResults";
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie'

const baseURL = process.env.REACT_APP_API_URL;
const postScoreURL = `${baseURL}/student/score`;

export async function postResults(results: TestResults){
    var testType = "";
    switch (results.testType){
        case "MOTION":
            testType = "motion_test"
            break;
        case "FORM_FIXED":
            testType = "fixed_form_test"
            break;
        case "FORM_RANDOM":
            testType = "random_form_test"
            break;
    }
    const form_data = {
        id: Cookies.get('c_testid'),
        test_type: testType,
        test_score: results.threshold.toFixed(2),
    }
    try {
        const { data } = await axios.post(postScoreURL, form_data)
        Cookies.remove('c_testid')
        return data.result;
    }
    catch (error){
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}


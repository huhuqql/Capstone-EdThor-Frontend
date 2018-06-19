export class Problem {
    problem_id?: number;
    problem_topic_name?: string;
    problem_type?: number;
    problem_type_name?: string;
    problem_kc?: number;
    problem_kc_name?: string;
    problem_text?: string;
    problem_questions?: string[];
    problem_answer_instruction?: string[];
    problem_answers?: string[];
    problem_solution_steps?: string;
    problem_multiple_choice_answer?: number;
    problem_long_question_solution?: any[];
    state?: string;
}

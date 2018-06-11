export class Problem {
    problem_id?: number;
    problem_topic_name?: string;
    problem_type?: number;
    problem_type_name?: string;
    problem_text?: string;
    problem_questions?: string[];
    problem_questions_target?: string[];
    problem_instruction?: string;
    problem_answer_instruction?: string[];
    problem_answers?: string[];
    problem_solution_steps?: string;
    state?: string;
}

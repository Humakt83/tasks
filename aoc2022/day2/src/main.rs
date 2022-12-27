use std::fs;

fn to_score(a: Option<char>, b: Option<char>) -> i32 {
    let score = match b {
        Some('X') => 1,
        Some('Y') => 2,
        Some('Z') => 3,
        _ => 0
    };
    return score + match (a, b) {
        (Some('A'), Some('X')) => 3,
        (Some('B'), Some('Y')) => 3,
        (Some('C'), Some('Z')) => 3,
        (Some('A'), Some('Y')) => 6,
        (Some('B'), Some('Z')) => 6,
        (Some('C'), Some('X')) => 6,
        _ => 0
    };
}

fn to_score2(a: Option<char>, b: Option<char>) -> i32 {
    return match (a, b) {
        (Some('A'), Some('X')) => to_score(a, Some('Z')),
        (Some('A'), Some('Y')) => to_score(a, Some('X')),
        (Some('A'), Some('Z')) => to_score(a, Some('Y')),
        (Some('B'), Some('X')) => to_score(a, Some('X')),
        (Some('B'), Some('Y')) => to_score(a, Some('Y')),
        (Some('B'), Some('Z')) => to_score(a, Some('Z')),
        (Some('C'), Some('X')) => to_score(a, Some('Y')),
        (Some('C'), Some('Y')) => to_score(a, Some('Z')),
        (Some('C'), Some('Z')) => to_score(a, Some('X')),
        _ => 0
    };
}

fn iter_to_score(lines: &Vec<&str>, score_fn: fn(a: Option<char>, b: Option<char>) -> i32) -> i32 {
    let mut score = 0;
    let mut first: Option<char> = None;
    for a in lines.into_iter() {
        if first == None {
            first = a.chars().next();
        } else {
            score += score_fn(first, a.chars().next());
            first = None;
        }
    }
    return score;
}

fn main() {
    let file_path = "input";
    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");
    let lines: Vec<&str> = contents.split_whitespace().collect();
    println!("Method 1: {:?}", iter_to_score(&lines, to_score));
    println!("Method 2: {:?}", iter_to_score(&lines, to_score2));
}

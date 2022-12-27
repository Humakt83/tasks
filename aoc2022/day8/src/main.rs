use std::fs;

fn is_in_edge(x: usize, y: usize, tree_lines: &Vec<Vec<Option<u32>>>) -> bool {
    let length_of_lines = &tree_lines.len();
    let length_of_line = &tree_lines.get(0).map(|a| a.len()).unwrap_or(0);
    return x == 0 || x == *length_of_line || y == 0 || y == *length_of_lines;
}

fn is_visible_from_x(tree: Option<u32>, x: usize, tree_line: &Vec<Option<u32>>) -> bool {
    let mut visible_from_west = true;
    let mut visible_from_east = true;
    for (pos, val) in tree_line.iter().enumerate() {
        if pos < x {
            visible_from_west = visible_from_west && val.unwrap_or(0) < tree.unwrap_or(0);
        } else if pos > x {
            visible_from_east = visible_from_east && val.unwrap_or(0) < tree.unwrap_or(0);
        }
    }
    return visible_from_west || visible_from_east;
}

fn is_visible_from_y(tree: Option<u32>, x: usize, y: usize, tree_lines: &Vec<Vec<Option<u32>>>) -> bool {
    let mut visible_from_south = true;
    let mut visible_from_north = true;
    for pos in 0..(tree_lines.len()) {
        if pos < y {
            visible_from_north = visible_from_north && tree_lines.get(pos).unwrap().get(x).unwrap() < &tree;
        } else if pos > y {
            visible_from_south = visible_from_south && tree_lines.get(pos).unwrap().get(x).unwrap() < &tree;
        }
    }
    return visible_from_south || visible_from_north;
}

fn is_tree_visible(tree: Option<u32>, x: usize, y: usize, tree_lines: &Vec<Vec<Option<u32>>>) -> bool {
    if is_in_edge(x, y, &tree_lines) {
        return true;
    }
    if is_visible_from_x(tree, x, &tree_lines.get(y).unwrap()) {
        return true;
    }
    if is_visible_from_y(tree, x, y, tree_lines) {
        return true;
    }
    return false;
}

fn score_from_x(tree: Option<u32>, x: usize, tree_line: &Vec<Option<u32>>) -> u32 {
    let mut score_to_east = 0;
    let mut pos = x;
    let mut blocked = false;
    while pos < (tree_line.len() - 1) && !blocked  {
        pos += 1;
        score_to_east += 1;
        if tree_line.get(pos).unwrap() >= &tree {
            blocked = true;
        }
    }
    pos = x;
    blocked = false;
    let mut score_to_west = 0;
    while pos > 0 && !blocked  {
        pos -= 1;
        score_to_west += 1; 
        if tree_line.get(pos).unwrap() >= &tree {
            blocked = true;
        }
    }
    return score_to_west * score_to_east;
}

fn score_from_y(tree: Option<u32>, x: usize, y: usize, tree_lines: &Vec<Vec<Option<u32>>>) -> u32 {
    let mut score_to_south = 0;
    let mut pos = y;
    let mut blocked = false;
    while pos < (tree_lines.len() - 1) && !blocked  {
        pos += 1;
        score_to_south += 1;
        if tree_lines.get(pos).unwrap().get(x).unwrap() >= &tree {
            blocked = true;
        }
    }
    pos = y;
    blocked = false;
    let mut score_to_north = 0;
    while pos > 0 && !blocked  {
        pos -= 1;
        score_to_north += 1; 
        if tree_lines.get(pos).unwrap().get(x).unwrap() >= &tree {
            blocked = true;
        }
    }
    return score_to_south * score_to_north;
}

fn score_of_tree(tree: Option<u32>, x: usize, y: usize, tree_lines: &Vec<Vec<Option<u32>>>) -> u32 {
    return score_from_x(tree, x, &tree_lines.get(y).unwrap()) * score_from_y(tree, x, y, tree_lines);
}

fn main() {
    let file_path = "input";
    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");
    let tree_lines: Vec<Vec<Option<u32>>> = contents.split("\n").map(|s| s.chars().filter(|a| a.is_digit(10)).map(|a| a.to_digit(10)).collect()).collect();
    let mut trees_visible = 0;
    let mut total_trees = 0;
    let mut highest_score = 0;
    for (y, line) in tree_lines.iter().enumerate() {
        for (x, tree) in line.iter().enumerate() {
            if is_tree_visible(*tree, x, y, &tree_lines) {
                trees_visible += 1;
                let score_for_tree = score_of_tree(*tree, x, y, &tree_lines);
                if score_for_tree > highest_score {
                    highest_score = score_for_tree;
                }
            }
            total_trees += 1;
        }
    }
    
    println!("Visible trees: {:?}", trees_visible);
    println!("Total trees: {:?}", total_trees);
    println!("Highest score: {:?}", highest_score);
}

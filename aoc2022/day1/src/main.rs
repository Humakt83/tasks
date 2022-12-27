use std::fs;

fn main() {
    let file_path = "input";
    let contents = fs::read_to_string(file_path)
        .expect("Should have been able to read the file");
    let lines: Vec<&str> = contents.split("\n").collect(); 
    let mut elves: Vec<i32> = Vec::new();
    let mut calories: i32 = 0;
    for line in lines {
        if line.trim().is_empty() {
            elves.push(calories);
            calories = 0;
        } else {
            calories += line.trim().parse::<i32>().unwrap();
        }
    }
    elves.sort();
    elves.reverse();
    let top3 = elves[0..3].to_vec();

    println!("Top calories {:?}", elves.get(0));
    println!("Top 3 calories {:?}", top3);
    println!("Top 3 calories {:?}", top3.into_iter().reduce(|a,b| a + b));
}
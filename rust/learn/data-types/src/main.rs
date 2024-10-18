use std::io;

// 字符类型
fn char() {
    let c = 'z';
    // let c = 'xyz'; // error: character literal may only contain one codepoint
    let z: char = 'ℤ'; // with explicit type annotation
    let heart_eyed_cat = '😻';

    println!("char: {c} {z} {heart_eyed_cat}");
}

// 元祖类型
fn tuple() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    println!("tuple: {}", tup.0);

    let (x, y, z) = tup;
    println!("tuple: {x} {y} {z}");
}

fn array() {
    let months = ["January", "February", "March"];

    let a: [i32; 5] = [1, 2, 3, 4, 5];

    println!("array: {}", months[1]); // February
    println!("array: {}", a[3]); // 4
}

fn invalid_array() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin().read_line(&mut index).expect("Failed to read line");

    let index: usize = index.trim().parse().expect("Index entered was not a number");

    let element = a[index];

    println!("The value of the element at index {index} is: {element}");
}

fn main() {
    // char()
    // tuple()
    // array()
    invalid_array()
}

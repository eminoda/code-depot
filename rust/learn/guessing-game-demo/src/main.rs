// 标准库里的 io
use std::io;
use std::cmp::Ordering;

use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(10..100);

    println!("随机数为 {}", secret_number);

    loop {
        let mut guess = String::new(); // 定义可变变量

        // 控制台输入
        io::stdin().read_line(&mut guess).expect("Failed to read line");

        // let guess: u32 = guess.trim().parse().expect("Please type a number!");
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                continue;
            }
        };
        println!("You guessed: {}", guess); // 变量输出

        // 对比 secret_number 和 guess
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}

// 变量不可改变
// fn main() {
//     let x = 5;
//     println!("The value of x is: {x}");
//     // cannot assign twice to immutable variable `x`
//     x = 6;
//     println!("The value of x is: {x}");
// }

// 需要添加 mut 修饰
// fn main() {
//     let mut x = 5;
//     println!("The value of x is: {x}");
//     x = 6;
//     println!("The value of x is: {x}");
// }

// 变量存在作用域
// fn main() {
//     let x = 5;
//     let x = x + 1;
//     {
//         let x = x * 2;
//         println!("The value of x in the inner scope is: {x}");
//     }
//     println!("The value of x is: {x}"); // 6
// }

// 变量类型匹配
fn main() {
    // let x = 5;
    // let x = "abc";

    // error[E0308]: mismatched types
    let mut x = 5;
    x = "abc";

    println!("The value of x is: {x}");
}

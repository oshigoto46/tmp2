// 100ms 後に reject される Promise を返す
const asyncFunction = (v) => new Promise((r1, r2) => setTimeout(() => r2(v), 1000));

const nothing = async () => {
    asyncFunction('nothing');
};

const justAwait = async () => {
    await asyncFunction('just await');
};

// const justTryCatch = async () => {
//     try {
//         asyncFunction('just try catch');
//     } catch (e) {
//         console.error(e);
//     }
// }

// const tryCatchWithAwait = async () => {
//     try {
//         await asyncFunction('try catch with await');
//     } catch (e) {
//         console.error(e);
//     }
// }

// const justCatch = async () => {
//     return asyncFunction('just catch').catch(e => console.error(e));
// }

const awaitCatch = async () => {
    return await asyncFunction('await catch').then(()=> 
    {console.log("go good")}).catch(e => console.error(e));
}

nothing();
// justAwait();
// justTryCatch();
// tryCatchWithAwait();
// justCatch();
awaitCatch();

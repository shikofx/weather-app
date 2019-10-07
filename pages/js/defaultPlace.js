console.log('js')
// fetch('http://localhost:3000/weather?place=Minsk')
//     .then((responce) => {
//         responce.json().then((data)=>{
//             console.log(data);
//         });
//     });

    console.log('JS script for pages is loaded');

    fetch('http://localhost:3000/weather?place=Poland').then((responce) => {
        console.log(responce.body);
    }); 
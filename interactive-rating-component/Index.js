// document.addEventListener('DOMContentLoaded', function () {
//         const ratingItems = document.querySelectorAll('.rator-box ul > li');
//         const submitButton = document.querySelector('.rator-box button');
//         const thankyouCard = document.querySelector('.thankyou-card');

//         let selectedRating = 0;

//         ratingItems.forEach(item => {
//             item.addEventListener('click', function () {
//                 selectedRating = parseInt(this.id);
//                 ratingItems.forEach(item => item.classList.remove('selected'));
//                 this.classList.add('selected');
//             });
//         });

//         submitButton.addEventListener('click', function () {
//             if (selectedRating > 0) {
//                 // Perform submission logic (you can use AJAX or redirect to a thank-you page)
//                 thankyouCard.style.display = 'block';
//                 document.querySelector('.thankyou-card span').innerText = `You selected ${selectedRating} out of 5`;
//             }
//         });
//     });
// var Share = function(url) {
//   return {
//     url: url,

//     events: function() {
//       var elements = document.querySelectorAll('.share a');
//       var lists = [].slice.call(elements);

//       var onClick = function(e) {
//         e.preventDefault();

        
//       };

//       list.forEach(function(element, index) {
//         element.addEventListener('click', onClick);
//       });
//     },

//     twitter: function() {
//       var urlTwitter = 'https://twitter.com/share?url={{ URL }}'.replace('{{ URL }}', url);
//       window.open(urlTwitter);
//     },

//     facebook: function() {
//       var urlFacebook = 'https://www.facebook.com/sharer/sharer.php?u={{ URL }}'.replace('{{ URL }}', url);
//       window.open(urlFacebook);
//     }
//   }
// };

// module.exports = Share;
